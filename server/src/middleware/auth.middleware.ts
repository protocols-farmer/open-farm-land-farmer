//src/middleware/auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma, { ExtendedPrismaClient } from "../db/prisma.js";
import { config } from "../config/index.js";
import { DecodedAccessTokenPayload } from "../features/auth/auth.types.js";
import { createHttpError } from "../utils/error.factory.js";
import { asyncHandler } from "./asyncHandler.js";
import { logger } from "../config/logger.js";

export const verifyToken = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    logger.debug({ path: req.path }, "[Auth Middleware] verifyToken triggered");

    let token = req.cookies?.accessToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return next(
        createHttpError(401, "Unauthorized: No authentication token provided."),
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.accessSecret,
      ) as DecodedAccessTokenPayload;

      if (
        !decoded.id ||
        !decoded.email ||
        !decoded.systemRole ||
        !decoded.username ||
        decoded.type !== "access"
      ) {
        logger.warn(
          { payload: decoded },
          "[Auth Middleware] Invalid token payload",
        );
        return next(
          createHttpError(401, "Unauthorized: Invalid token payload."),
        );
      }

      const userFromDb = await (prisma as ExtendedPrismaClient).user.findUnique(
        {
          where: { id: decoded.id },
        },
      );

      if (!userFromDb) {
        logger.warn(
          { userId: decoded.id },
          "[Auth Middleware] User not found in DB",
        );
        return next(createHttpError(401, "Unauthorized: User not found."));
      }

      if (userFromDb.status !== "ACTIVE") {
        const allowedPaths = ["/user/me", "/appeals", "/auth/logout"];
        const isAllowed = allowedPaths.some(
          (path) => req.originalUrl.includes(path) || req.path.includes(path),
        );

        if (!isAllowed) {
          logger.warn(
            { userId: userFromDb.id, status: userFromDb.status },
            "[Auth Middleware] Access denied: Account is not ACTIVE",
          );

          throw createHttpError(
            403,
            `Your account is ${userFromDb.status.toLowerCase()}. Please contact support.`,
          );
        }
      }

      req.user = {
        id: userFromDb.id,
        name: userFromDb.name,
        username: userFromDb.username,
        email: userFromDb.email,
        isEmailVerified: userFromDb.isEmailVerified,
        profileImage: userFromDb.profileImage,
        bannerImage: userFromDb.bannerImage,
        bio: userFromDb.bio,
        title: userFromDb.title,
        location: userFromDb.location,
        systemRole: userFromDb.systemRole,
        status: userFromDb.status,
        joinedAt: userFromDb.joinedAt,
        updatedAt: userFromDb.updatedAt,
      };

      logger.info(
        { userId: req.user!.id, username: req.user!.username },
        "[Auth Middleware] User authenticated and attached to request",
      );

      next();
    } catch (err) {
      next(err);
    }
  },
);

export const optionalVerifyToken = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token = req.cookies?.accessToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) return next();

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.accessSecret,
      ) as DecodedAccessTokenPayload;

      const userFromDb = await (prisma as ExtendedPrismaClient).user.findUnique(
        {
          where: { id: decoded.id },
        },
      );

      if (userFromDb && userFromDb.status === "ACTIVE") {
        req.user = {
          id: userFromDb.id,
          name: userFromDb.name,
          username: userFromDb.username,
          email: userFromDb.email,
          isEmailVerified: userFromDb.isEmailVerified,
          profileImage: userFromDb.profileImage,
          bannerImage: userFromDb.bannerImage,
          bio: userFromDb.bio,
          title: userFromDb.title,
          location: userFromDb.location,
          systemRole: userFromDb.systemRole,
          status: userFromDb.status,
          joinedAt: userFromDb.joinedAt,
          updatedAt: userFromDb.updatedAt,
        };
      }
      next();
    } catch (err) {
      next();
    }
  },
);
