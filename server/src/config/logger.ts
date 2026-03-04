//src/config/logger.ts
import pino from "pino";
import { config } from "./index.js";

const level = config.logLevel || "info";

const transport =
  config.nodeEnv === "development"
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      })
    : undefined;

/**
 * The application's central logger instance.
 * It's configured to be environment-aware.
 */
export const logger = pino(
  {
    level: level,

    redact: ["req.headers.authorization", "req.body.password"],
  },
  transport,
);

logger.info(`✅ Logger configured with level: '${level}'`);
