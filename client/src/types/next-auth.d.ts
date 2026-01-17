// FILE: src/lib/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { SystemRole } from "../features/user/userTypes";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      systemRole: SystemRole;
      // ADD THESE:
      bio?: string | null;
      title?: string | null;
      location?: string | null;
      profileImage?: string | null;
      bannerImage?: string | null;
      twitterUrl?: string | null;
      githubUrl?: string | null;
      websiteUrl?: string | null;
      joinedAt?: string;
      updatedAt?: string;
    } & DefaultSession["user"];

    backendAccessToken?: string;
    error?: string;
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    systemRole: SystemRole;
    // ADD THESE:
    bio?: string | null;
    title?: string | null;
    location?: string | null;
    profileImage?: string | null;
    bannerImage?: string | null;
    twitterUrl?: string | null;
    githubUrl?: string | null;
    websiteUrl?: string | null;
    joinedAt?: string;
    updatedAt?: string;
    backendAccessToken: string;
    backendRefreshToken: string;
    backendAccessTokenExpiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
    systemRole: SystemRole;
    // ADD THESE:
    bio?: string | null;
    title?: string | null;
    location?: string | null;
    profileImage?: string | null;
    bannerImage?: string | null;
    twitterUrl?: string | null;
    githubUrl?: string | null;
    websiteUrl?: string | null;
    joinedAt?: string;
    updatedAt?: string;
    backendAccessToken: string;
    backendRefreshToken: string;
    backendAccessTokenExpiresAt: number;
    error?: string;
  }
}
