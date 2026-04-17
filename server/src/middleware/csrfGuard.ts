//src/middleware/csrfGuard.ts
import { Request, Response, NextFunction } from "express";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";

export const csrfGuard = (req: Request, _res: Response, next: NextFunction) => {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  const clientHeader = req.headers["x-requested-with"];

  if (clientHeader !== "XMLHttpRequest") {
    logger.warn(
      { ip: req.ip, method: req.method, path: req.originalUrl },
      "🛡️ CSRF Guard triggered: Blocked request missing custom header.",
    );
    return next(
      createHttpError(
        403,
        "Forbidden: Invalid request origin (CSRF protection).",
      ),
    );
  }

  next();
};
