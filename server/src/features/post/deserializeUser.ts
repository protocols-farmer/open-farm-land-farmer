// src/middleware/deserializeUser.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/db/prisma.js";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { config } from "@/config/index.js";
import { DecodedAccessTokenPayload } from "@/types/auth.types.js";
import { logger } from "@/config/logger.js";

/**
 * Middleware that attempts to find a user based on a Bearer token.
 * It DOES NOT block the request if the token is missing or invalid.
 * Use 'verifyToken' for routes that MUST be private.
 */
export const deserializeUser = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.accessSecret
      ) as DecodedAccessTokenPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          profileImage: true,
          bannerImage: true,
          systemRole: true,
          status: true,
        },
      });

      if (!user || user.status !== "ACTIVE") {
        req.user = null;
        return next();
      }

      // Attach user to the request
      req.user = {
        ...user,
        profileImage: user.profileImage || "",
        bannerImage: user.bannerImage || "",
      };
    } catch (error) {
      // Token expired or malformed - we treat them as a guest
      logger.debug(
        "DeserializeUser: Invalid token provided. Treating as guest."
      );
      req.user = null;
    }

    next();
  }
);
