// src/lib/authOptions.tsx
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { jwtDecode } from "jwt-decode";
import { SystemRole, SanitizedUserDto } from "@/lib/features/user/userTypes";

interface BackendAuthResponse {
  status: string;
  message?: string;
  data: {
    user: SanitizedUserDto;
    tokens: {
      accessToken: string;
      refreshToken: string;
      refreshTokenExpiresAt: string;
    };
  };
}

const getExpiryFromToken = (token: string): number => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp * 1000; // Convert to ms
  } catch {
    return 0;
  }
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: token.backendRefreshToken }),
      }
    );

    const refreshed = await response.json();
    if (!response.ok) throw refreshed;

    return {
      ...token,
      backendAccessToken: refreshed.data.tokens.accessToken,
      backendAccessTokenExpiresAt: getExpiryFromToken(
        refreshed.data.tokens.accessToken
      ),
      backendRefreshToken:
        refreshed.data.tokens.refreshToken ?? token.backendRefreshToken,
    };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        action: {},
        email: {},
        password: {},
        username: {},
        name: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const endpoint =
          credentials.action === "signup" ? "/auth/register" : "/auth/login";

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${endpoint}`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const resData: BackendAuthResponse = await res.json();
        if (!res.ok) {
          throw new Error(resData.message || "Authentication failed");
        }

        return {
          ...resData.data.user,
          backendAccessToken: resData.data.tokens.accessToken,
          backendRefreshToken: resData.data.tokens.refreshToken,
          backendAccessTokenExpiresAt: getExpiryFromToken(
            resData.data.tokens.accessToken
          ),
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      // 1. Handle Initial Sign-in
      if (user && account) {
        if (account.provider === "credentials") {
          return { ...token, ...user };
        } else {
          // OAuth Flow: Sync with backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/oauth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: profile?.email,
                name: profile?.name,
                image: profile?.image || (profile as any).avatar_url,
              }),
            }
          );

          if (!response.ok) return { ...token, error: "OAuthSyncError" };
          const resData: BackendAuthResponse = await response.json();

          return {
            ...token,
            ...resData.data.user, // Spread full user data into the token
            backendAccessToken: resData.data.tokens.accessToken,
            backendAccessTokenExpiresAt: getExpiryFromToken(
              resData.data.tokens.accessToken
            ),
            backendRefreshToken: resData.data.tokens.refreshToken,
          };
        }
      }

      // 2. Handle Session Update (Triggered by update() in ProfileForm)
      // This merges the updated user data from the frontend into the JWT cookie
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }

      // 3. Return token if not expired (with 30s buffer)
      if (Date.now() < (token.backendAccessTokenExpiresAt as number) - 30000) {
        return token;
      }

      // 4. Token expired: attempt refresh
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token && session.user) {
        // Essential Fields
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.systemRole = token.systemRole as SystemRole;

        // Profile Metadata (Crucial for persistence when switching tabs)
        session.user.bio = token.bio as string;
        session.user.title = token.title as string;
        session.user.location = token.location as string;
        session.user.profileImage = token.profileImage as string;
        session.user.bannerImage = token.bannerImage as string;
        session.user.twitterUrl = token.twitterUrl as string;
        session.user.githubUrl = token.githubUrl as string;
        session.user.websiteUrl = token.websiteUrl as string;

        // Timestamps (Used for cache-busting logic in Nav/Header)
        session.user.joinedAt = token.joinedAt as string;
        session.user.updatedAt = token.updatedAt as string;

        // Backend Auth Metadata
        session.backendAccessToken = token.backendAccessToken as string;
        session.error = token.error as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
