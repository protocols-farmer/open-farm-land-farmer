//src/utils/jwt.utils.ts
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@prisma-client";
import { config } from "../config/index.js";
import prisma, { ExtendedTransactionClient } from "../db/prisma.js";
import {
  DecodedAccessTokenPayload,
  DecodedRefreshTokenPayload,
} from "../types/auth.types.js";
import { createHttpError } from "./error.factory.js";
import { HttpError } from "./HttpError.js";
import { logger } from "../config/logger.js";
const { TokenExpiredError, JsonWebTokenError } = jwt;

export const generateAccessToken = (user: User): string => {
  const payload: Omit<DecodedAccessTokenPayload, "iat" | "exp"> = {
    id: user.id,
    systemRole: user.systemRole,
    type: "access",
    username: user.username,
    displayName: user.name,
    ...(user.profileImage && { profileImage: user.profileImage }),
  };

  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: Number(config.jwt.accessExpiresInSeconds),
  });
};

/**
 * Generates and stores a refresh token.
 * Uses ExtendedTransactionClient to remain compatible with your extended Prisma instance.
 */
export const generateAndStoreRefreshToken = async (
  userId: string,
  tx: ExtendedTransactionClient = prisma // Default to the main extended client
): Promise<{ token: string; expiresAt: Date }> => {
  const jti = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + config.jwt.refreshExpiresInDays);

  // Now 'tx' is correctly typed to include your extensions (like hashedPassword compute)
  await tx.refreshToken.create({
    data: { jti, userId, expiresAt },
  });

  const token = jwt.sign(
    { id: userId, type: "refresh" },
    config.jwt.refreshSecret,
    {
      expiresIn: `${config.jwt.refreshExpiresInDays}d`,
      jwtid: jti,
    }
  );

  return { token, expiresAt };
};

export const verifyAndValidateRefreshToken = async (
  token: string
): Promise<DecodedRefreshTokenPayload> => {
  try {
    const decoded = jwt.verify(
      token,
      config.jwt.refreshSecret
    ) as DecodedRefreshTokenPayload;

    if (!decoded.jti || !decoded.id || decoded.type !== "refresh") {
      throw createHttpError(401, "Invalid session payload.");
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { jti: decoded.jti },
    });

    // --- SECURITY: REUSE DETECTION ---
    if (!storedToken || storedToken.revoked) {
      if (storedToken?.revoked) {
        // Someone is trying to reuse a rotated token! Revoke everything for this user.
        await prisma.refreshToken.updateMany({
          where: { userId: decoded.id },
          data: { revoked: true },
        });
        logger.fatal(
          { userId: decoded.id, jti: decoded.jti },
          "SECURITY BREACH: Refresh token reuse detected. All sessions invalidated."
        );
        throw createHttpError(
          403,
          "Security breach detected. Please log in again."
        );
      }
      throw createHttpError(403, "Session invalid or expired.");
    }

    if (new Date() > storedToken.expiresAt) {
      throw createHttpError(403, "Session expired.");
    }

    return decoded;
  } catch (error) {
    if (error instanceof HttpError) throw error;

    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      throw createHttpError(
        403,
        "Your session is invalid. Please log in again."
      );
    }

    throw createHttpError(
      500,
      "Internal server error during session verification."
    );
  }
};
