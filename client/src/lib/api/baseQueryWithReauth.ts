// client/src/lib/api/baseQueryWithReauth.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { getSession, signOut } from "next-auth/react";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const session = await getSession();
  let token = session?.backendAccessToken;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include",
  });

  // 1. Attempt the original request
  let result = await rawBaseQuery(args, api, extraOptions);

  // 2. Check if it failed with 401
  if (result.error && result.error.status === 401) {
    console.warn("Access token expired. Attempting to refresh session...");

    /**
     * CRITICAL FIX:
     * We don't call a custom /refresh endpoint here because NEXT-AUTH
     * handles the refresh logic in the background via the 'jwt' callback.
     * We just need to get the UPDATED session.
     */
    const refreshedSession = await getSession(); // This triggers NextAuth's internal refresh
    const newToken = refreshedSession?.backendAccessToken;

    if (newToken && newToken !== token) {
      // 3. The refresh worked! Retry the original request with the new token
      console.log("Session refreshed successfully. Retrying request.");

      const retryBaseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
        prepareHeaders: (h) => {
          h.set("authorization", `Bearer ${newToken}`);
          return h;
        },
        credentials: "include",
      });

      result = await retryBaseQuery(args, api, extraOptions);
    } else {
      // 4. Refresh failed (Refresh Token is likely expired too)
      console.error("Refresh failed. Redirecting to login.");

      // Prevent redirecting if we are already on the login page
      const isAuthAction =
        typeof args === "string"
          ? args.includes("login")
          : args.url.includes("login");

      if (!isAuthAction) {
        signOut({ callbackUrl: "/auth/login?error=SessionExpired" });
      }
    }
  }

  return result;
};
