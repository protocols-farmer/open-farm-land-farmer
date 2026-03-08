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

export const logger = pino(
  {
    level: level,

    redact: {
      paths: [
        "req.headers.authorization",
        "req.body.password",
        "req.body.currentPassword",
        "req.body.newPassword",
      ],
      remove: true,
    },

    serializers: {
      err: pino.stdSerializers.err,
    },
  },
  transport,
);

logger.info(`✅ Logger configured with level: '${level}'`);
