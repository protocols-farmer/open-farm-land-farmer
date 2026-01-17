//src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { createHttpError } from "@/utils/error.factory.js";

/**
 * REFINED: Global Validation Middleware.
 * Parses request body, query, and params against a Zod schema.
 * Returns structured, field-specific error messages.
 */
export const validate =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate all possible request data sources
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        /**
         * REFINED: Error Mapping
         * We extract the specific field name (e.g., 'email') and the
         * custom message defined in your Zod schema.
         */
        const firstIssue = error.issues[0];

        // The 'path' array contains the nested location of the error.
        // We take the last element to identify the exact field.
        const fieldName = firstIssue.path[firstIssue.path.length - 1];
        const errorMessage = firstIssue.message;

        // If fieldName is 'body' or missing, we just show the message.
        // Otherwise, we format it as "Field: Message"
        const formattedMessage =
          fieldName && fieldName !== "body"
            ? `${String(fieldName)}: ${errorMessage}`
            : errorMessage;

        return next(createHttpError(400, formattedMessage));
      }

      // Fallback for unexpected system errors during parsing
      next(
        createHttpError(500, "Internal Server Error during input validation.")
      );
    }
  };
