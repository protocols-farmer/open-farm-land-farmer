//src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { createHttpError } from "@/utils/error.factory.js";

export const validate =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstIssue = error.issues[0];

        const fieldName = firstIssue.path[firstIssue.path.length - 1];
        const errorMessage = firstIssue.message;

        const formattedMessage =
          fieldName && fieldName !== "body"
            ? `${String(fieldName)}: ${errorMessage}`
            : errorMessage;

        return next(createHttpError(400, formattedMessage));
      }

      next(
        createHttpError(500, "Internal Server Error during input validation."),
      );
    }
  };
