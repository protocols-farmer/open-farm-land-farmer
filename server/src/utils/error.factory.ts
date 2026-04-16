// src/utils/error.factory.ts

import { HttpError } from "./HttpError.js";

export const createHttpError = (
  statusCode: number,
  message: string,
): HttpError => {
  return new HttpError(statusCode, message);
};
