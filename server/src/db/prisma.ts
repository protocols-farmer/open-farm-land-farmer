//src/db/prisma.ts

import { PrismaClient, Prisma } from "@prisma-client";
import { config } from "../config/index.js";
import { logger } from "../config/logger.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: config.databaseUrl,
});

const adapter = new PrismaPg(pool);

const logLevels: Prisma.LogLevel[] =
  config.nodeEnv === "development"
    ? ["query", "info", "warn", "error"]
    : ["error"];

const prismaClient = new PrismaClient({
  adapter,
  log: logLevels,
});

const MAX_QUERY_RETRIES = 3;
const QUERY_RETRY_BASE_DELAY_MS = 1000;
const RETRIABLE_PRISMA_ERROR_CODES: string[] = [
  "P1000",
  "P1001",
  "P1002",
  "P1003",
  "P1008",
  "P1017",
  "P2024",
  "P3006",
];

const prisma = prismaClient.$extends({
  result: {
    user: {
      hashedPassword: {
        compute() {
          return undefined;
        },
      },
    },
  },

  query: {
    $allModels: {
      $allOperations: async ({ model, operation, args, query }) => {
        let attempts = 0;
        while (attempts <= MAX_QUERY_RETRIES) {
          try {
            return await query(args);
          } catch (error: any) {
            attempts++;
            let errorCode: string | undefined;

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              errorCode = error.code;

              if (
                !RETRIABLE_PRISMA_ERROR_CODES.includes(error.code) ||
                attempts > MAX_QUERY_RETRIES
              ) {
                throw error;
              }
            } else {
              throw error;
            }

            const delayMs =
              QUERY_RETRY_BASE_DELAY_MS * Math.pow(2, attempts - 1);

            logger.warn(
              {
                err: error,
                model,
                operation,
                attempt: attempts,
                maxRetries: MAX_QUERY_RETRIES,
                code: errorCode,
              },
              `Prisma query failed. Retrying in ${delayMs / 1000}s...`,
            );

            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
        }
        throw new Error(
          `Query (${model}.${operation}) failed after ${MAX_QUERY_RETRIES} retries.`,
        );
      },
    },
  },
});

const MAX_CONNECT_RETRIES = 5;
const CONNECT_RETRY_DELAY_MS = 5000;

export async function connectPrisma(
  retriesLeft: number = MAX_CONNECT_RETRIES,
): Promise<void> {
  try {
    await prisma.$connect();
    logger.info(
      "✅ Successfully connected to the database via Prisma Adapter (pg).",
    );
  } catch (error: any) {
    const currentAttempt = MAX_CONNECT_RETRIES - retriesLeft + 1;

    logger.error(
      { err: error, attempt: currentAttempt, maxRetries: MAX_CONNECT_RETRIES },
      `❌ Prisma Connection Error`,
    );

    if (retriesLeft > 0) {
      logger.info(
        `Retrying connection in ${CONNECT_RETRY_DELAY_MS / 1000} seconds...`,
      );
      await new Promise((resolve) =>
        setTimeout(resolve, CONNECT_RETRY_DELAY_MS),
      );
      return connectPrisma(retriesLeft - 1);
    } else {
      logger.fatal(
        "❌ Exhausted all retries. Failed to connect to the database. Exiting.",
      );
      process.exit(1);
    }
  }
}

/**
 * Disconnects the Prisma client and the Postgres pool.
 */
export async function disconnectPrisma(): Promise<void> {
  try {
    await prisma.$disconnect();
    await pool.end();
    logger.info("🔌 Prisma and Pool disconnected successfully.");
  } catch (error) {
    logger.error({ err: error }, "❌ Error during Prisma disconnect");
  }
}

export type ExtendedPrismaClient = typeof prisma;
export type ExtendedTransactionClient = Parameters<
  Parameters<ExtendedPrismaClient["$transaction"]>[0]
>[0];
export default prisma;
export const rawPrisma = prismaClient;
