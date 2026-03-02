// =================================================================
// FILE: src/types/express.d.ts
// =================================================================
import { SystemRole, UserStatus } from "@prisma-client";
import { UserJWTPayload } from "../features/auth/auth.types.js";

export {};

/**
 * The "Full User" representation from the database.
 */
export interface SanitizedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  bannerImage: string | null;
  bio: string | null;
  title: string | null;
  location: string | null;
  systemRole: SystemRole;
  status: UserStatus;
  joinedAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      /**
       * Can be a Full User (from database check)
       * or a Lite User (extracted directly from JWT).
       */
      user?: SanitizedUser | UserJWTPayload | null;
    }
  }
}
