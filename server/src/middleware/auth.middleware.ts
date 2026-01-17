//src/middleware/auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma, { ExtendedPrismaClient } from "../db/prisma.js"; // REFINED: Using Extended Type
import { config } from "../config/index.js";
import { DecodedAccessTokenPayload } from "../types/auth.types.js";
import { createHttpError } from "../utils/error.factory.js";
import { asyncHandler } from "./asyncHandler.js";
import { logger } from "../config/logger.js";

export const verifyToken = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    logger.debug({ path: req.path }, "[Auth Middleware] verifyToken triggered");

    // 1. Token extraction
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        createHttpError(401, "Unauthorized: No Bearer token provided.")
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(createHttpError(401, "Unauthorized: Token not found."));
    }

    try {
      // 2. Token Verification
      const decoded = jwt.verify(
        token,
        config.jwt.accessSecret
      ) as DecodedAccessTokenPayload;

      // 3. Payload Validation
      if (
        !decoded.id ||
        !decoded.systemRole ||
        !decoded.username ||
        decoded.type !== "access"
      ) {
        logger.warn(
          { payload: decoded },
          "[Auth Middleware] Invalid token payload"
        );
        return next(
          createHttpError(401, "Unauthorized: Invalid token payload.")
        );
      }

      // 4. Database User Validation (Using Extended Client for Type Safety)
      const userFromDb = await (prisma as ExtendedPrismaClient).user.findUnique(
        {
          where: { id: decoded.id },
        }
      );

      if (!userFromDb) {
        logger.warn(
          { userId: decoded.id },
          "[Auth Middleware] User not found in DB"
        );
        return next(createHttpError(401, "Unauthorized: User not found."));
      }

      // 5. REFINED: Strict Account Status Check
      if (userFromDb.status !== "ACTIVE") {
        logger.warn(
          { userId: userFromDb.id, status: userFromDb.status },
          "[Auth Middleware] Access denied: Account is not ACTIVE"
        );

        // Throwing here triggers the global error handler with a specific message
        throw createHttpError(
          403,
          `Your account is ${userFromDb.status.toLowerCase()}. Please contact support.`
        );
      }

      // 6. Attach Sanitized User to Request
      req.user = {
        id: userFromDb.id,
        systemRole: userFromDb.systemRole,
        username: userFromDb.username,
        name: userFromDb.name,
        profileImage: userFromDb.profileImage || "",
        bannerImage: userFromDb.bannerImage || "",
        status: userFromDb.status,
        email: userFromDb.email,
      };

      logger.info(
        { userId: req.user.id, username: req.user.username },
        "[Auth Middleware] User authenticated and attached to request"
      );

      next();
    } catch (err) {
      // Pass JWT and Custom Errors to the globalErrorHandler
      next(err);
    }
  }
);
