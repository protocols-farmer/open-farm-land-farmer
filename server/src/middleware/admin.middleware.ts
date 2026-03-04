//src/middleware/admin.middleware.ts
import { Request, Response, NextFunction } from "express";
import { SystemRole } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";

/**
 * Creates an Express middleware that checks if the authenticated user has at least one of the specified roles.
 * Throws a 403 Forbidden error if the user is not authenticated or does not have the required role.
 *
 * @param requiredRoles An array of SystemRole enums that are permitted to access the route.
 * @returns An Express middleware function.
 */
export const requireRole = (requiredRoles: SystemRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createHttpError(401, "Authentication required."));
    }

    const userRole = req.user.systemRole;

    if (requiredRoles.includes(userRole)) {
      return next();
    } else {
      return next(
        createHttpError(
          403,
          "Forbidden: You do not have permission to access this resource.",
        ),
      );
    }
  };
};
