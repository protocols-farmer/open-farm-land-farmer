// src/middleware/extractUser.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/config/index.js";
import { SanitizedUser } from "@/types/express.js"; // This now works!

export const extractUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      // HONEST TYPE CAST: We tell TS the token contains the full SanitizedUser
      const decoded = jwt.verify(
        token,
        config.jwt.accessSecret
      ) as SanitizedUser;

      req.user = decoded;
    } catch {
      // Invalid token, req.user stays undefined
    }
  }
  next();
};
