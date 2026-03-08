//src/middleware/isVerified.ts
import { Request, Response, NextFunction } from "express";
import { createHttpError } from "@/utils/error.factory.js";

/**
 * Middleware to block unverified users from specific actions.
 * Assumes verifyToken has already run and attached req.user.
 */
export const isVerified = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(createHttpError(401, "Authentication required."));
  }

  // SanitizedUser and LiteUser (from JWT) should both have this property now
  // We check the flag we added to the Prisma schema.
  if (!req.user.isEmailVerified) {
    return next(
      createHttpError(
        403,
        "Access denied: Please verify your email address to access this feature.",
      ),
    );
  }

  next();
};
