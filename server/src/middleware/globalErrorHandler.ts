// src/middleware/globalErrorHandler.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Prisma } from "@prisma-client";
import { config } from "../config/index.js";
import { HttpError } from "../utils/HttpError.js";
import { logger } from "@/config/logger.js";
import { MulterError } from "multer";
import jwt from "jsonwebtoken";

const { JsonWebTokenError, TokenExpiredError } = jwt;

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "An internal server error occurred.";
  let status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  // Log the error for internal tracking
  logger.error(
    {
      err: {
        message: err.message,
        stack: err.stack,
        code: err.code,
        meta: err.meta,
      },
    },
    "💥 Error Intercepted by Global Handler"
  );

  // --- 1. Handle HttpError (Custom Errors) ---
  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // --- 2. Handle Prisma Errors ---
  // --- 2. Handle Prisma Errors ---
  else if (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err.code?.startsWith("P")
  ) {
    switch (err.code) {
      case "P2002": {
        // Unique constraint violation
        statusCode = 409;
        status = "fail";

        // Fallback logic for when meta.target is missing
        const target = (err.meta as any)?.target?.join(", ");
        const errMsg = err.message?.toLowerCase() || "";

        if (target) {
          message = `This ${target} is already in use. Please choose another.`;
        } else if (errMsg.includes("email")) {
          message = "This email is already registered.";
        } else if (errMsg.includes("username")) {
          message = "That username is already taken.";
        } else {
          message = "An account with these details already exists.";
        }
        break;
      }
      case "P2025":
        statusCode = 404;
        message = "The requested resource could not be found.";
        status = "fail";
        break;
      default:
        statusCode = 400;
        message = "A database error occurred.";
        status = "fail";
    }
  }
  // --- 3. Handle Multer Errors (File Uploads) ---
  else if (err instanceof MulterError) {
    statusCode = 400;
    status = "fail";
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File is too large. Max size allowed is 5MB.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = `Unexpected field detected: '${err.field}'. Please check your form data keys.`;
        break;
      default:
        message = `File upload error: ${err.message}`;
    }
  }

  // --- 4. Handle JWT Specific Errors ---
  else if (err instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Your session has expired. Please log in again.";
    status = "fail";
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid session token. Please authenticate again.";
    status = "fail";
  }

  // --- Final Response Construction ---
  const responsePayload: { status: string; message: string; stack?: string } = {
    status,
    message,
  };

  // Only expose the stack trace in development mode
  if (config.nodeEnv === "development") {
    responsePayload.stack = err.stack;
  }

  res.status(statusCode).json(responsePayload);
};
