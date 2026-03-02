// src/middleware/extractUser.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/config/index.js";
import { UserJWTPayload } from "@/features/auth/auth.types.js";

export const extractUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      // Cast only to what is actually in the JWT
      const decoded = jwt.verify(
        token,
        config.jwt.accessSecret,
      ) as UserJWTPayload;

      req.user = decoded;
    } catch {
      // Fail silently: req.user stays undefined for guests
    }
  }
  next();
};
