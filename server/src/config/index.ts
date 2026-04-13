//src/config/index.ts

/**
 * Helper to get and validate environment variables.
 * Throws an error if a required variable is missing.
 */
const getEnvVariable = (key: string, required: boolean = true): string => {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(
      `❌ Fatal Error: Missing required environment variable ${key}. Check your .env file or platform settings.`,
    );
  }
  return value || "";
};

/**
 * Helper to get and validate environment variables as integers.
 * Throws an error for missing or invalid values.
 */
const getEnvVariableAsInt = (
  key: string,
  required: boolean = true,
  defaultValue?: number,
): number => {
  const valueStr = process.env[key];

  if (!valueStr) {
    if (required && defaultValue === undefined) {
      throw new Error(
        `❌ Fatal Error: Missing required environment variable ${key}.`,
      );
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return NaN;
  }

  const intValue = parseInt(valueStr, 10);

  if (isNaN(intValue)) {
    throw new Error(
      `❌ Fatal Error: Invalid integer format for environment variable ${key}. Value: "${valueStr}"`,
    );
  }
  return intValue;
};

interface Config {
  nodeEnv: "development" | "production" | "test";
  port: number;
  databaseUrl: string;
  corsOrigin: string;
  jwt: {
    accessSecret: string;
    accessExpiresInSeconds: number;
    refreshSecret: string;
    refreshExpiresInSeconds: number;
  };
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };

  socialAuth: {
    google: {
      clientId: string;
      clientSecret: string;
      callbackUrl: string;
    };
    github: {
      clientId: string;
      clientSecret: string;
      callbackUrl: string;
    };
    frontendUrl: string;
  };

  rateLimits: {
    auth: {
      windowMs: number;
      max: number;
      maxAttempts: number; // 🚜 Added
      lockoutMinutes: number;
    };
    api: {
      windowMs: number;
      max: number;
    };
    emailResend: { windowMs: number; max: number }; // <--- ADD THIS
  };
  cookies: {
    refreshTokenName: string;
  };
  logLevel: string;
  github: {
    pat: string;
  };

  mailgun: {
    apiKey: string;
    domain: string;
    fromEmail: string;
  };
}

let config: Config;

try {
  config = {
    nodeEnv: getEnvVariable("NODE_ENV", true) as
      | "development"
      | "production"
      | "test",
    port: getEnvVariableAsInt("PORT", true),
    databaseUrl: getEnvVariable("DATABASE_URL", true),
    corsOrigin: getEnvVariable("CORS_ORIGIN", true),

    jwt: {
      accessSecret: getEnvVariable("ACCESS_TOKEN_SECRET", true),
      accessExpiresInSeconds: getEnvVariableAsInt(
        "ACCESS_TOKEN_EXPIRES_IN_SECONDS",
        true,
      ),
      refreshSecret: getEnvVariable("REFRESH_TOKEN_SECRET", true),

      refreshExpiresInSeconds: getEnvVariableAsInt(
        "REFRESH_TOKEN_EXPIRES_IN_SECONDS",
        true,
      ),
    },

    cloudinary: {
      cloudName: getEnvVariable("CLOUDINARY_CLOUD_NAME", true),
      apiKey: getEnvVariable("CLOUDINARY_API_KEY", true),
      apiSecret: getEnvVariable("CLOUDINARY_API_SECRET", true),
    },

    socialAuth: {
      google: {
        clientId: getEnvVariable("GOOGLE_CLIENT_ID", true),
        clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET", true),
        callbackUrl: getEnvVariable("GOOGLE_CALLBACK_URL", true),
      },
      github: {
        clientId: getEnvVariable("GITHUB_CLIENT_ID", true),
        clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET", true),
        callbackUrl: getEnvVariable("GITHUB_CALLBACK_URL", true),
      },
      frontendUrl: getEnvVariable("FRONTEND_URL", true),
    },

    rateLimits: {
      auth: {
        windowMs: getEnvVariableAsInt("AUTH_LIMIT_WINDOW_MS", false, 900000),
        max: getEnvVariableAsInt("AUTH_LIMIT_MAX", false, 10),
        maxAttempts: getEnvVariableAsInt("AUTH_MAX_LOGIN_ATTEMPTS", false, 5),
        lockoutMinutes: getEnvVariableAsInt(
          "AUTH_LOCKOUT_DURATION_MINS",
          false,
          15,
        ),
      },
      api: {
        windowMs: getEnvVariableAsInt("API_LIMIT_WINDOW_MS", false, 60000),
        max: getEnvVariableAsInt("API_LIMIT_MAX", false, 100),
      },
      emailResend: {
        windowMs: getEnvVariableAsInt("EMAIL_RESEND_WINDOW_MS", false, 900000),
        max: getEnvVariableAsInt("EMAIL_RESEND_MAX", false, 3),
      },
    },
    cookies: {
      refreshTokenName: "jid",
    },
    github: {
      pat: getEnvVariable("GITHUB_PAT", true),
    },
    logLevel: getEnvVariable("LOG_LEVEL", false) || "info",
    mailgun: {
      apiKey: getEnvVariable("MAILGUN_API_KEY", true),
      domain: getEnvVariable("MAILGUN_DOMAIN", true),
      fromEmail: getEnvVariable("MAILGUN_FROM_EMAIL", true),
    },
  };
} catch (error) {
  console.error(
    "❌ Critical error during application configuration setup:",
    error,
  );
  process.exit(1);
}

export { config };
