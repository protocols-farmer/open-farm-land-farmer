//src/middleware/admin.middleware.ts
import { Request, Response, NextFunction } from "express";
import { SystemRole } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";

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
