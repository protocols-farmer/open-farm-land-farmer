// src/lib/api/baseQueryWithReauth.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setCredentials, clearCredentials } from "../features/auth/authSlice";

let isRefreshing = false;

/**
 * Custom base query that handles automatic secure cookie transmission
 * and silent Refresh Token Rotation.
 * * FIX: Removed aggressive redirects to allow guests/new users to browse freely.
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 🛡️ CONFIGURATION:
  // "credentials: include" ensures the browser automatically sends HttpOnly cookies.
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    credentials: "include",
  });

  let result = await rawBaseQuery(args, api, extraOptions);

  // 1. Handle 403 Forbidden (Permissions issue - no refresh needed)
  if (result.error && result.error.status === 403) {
    return result;
  }

  // 2. Handle 401 Unauthorized (Token missing or expired)
  if (result.error && result.error.status === 401) {
    const isRefreshRequest =
      (typeof args === "string" && args.includes("/auth/refresh")) ||
      (typeof args !== "string" && args.url === "/auth/refresh");

    /**
     * SCENARIO A: The Refresh Request itself failed.
     * This happens for guests (no cookies) or users with expired sessions.
     * We clear local state, but we DO NOT force a redirect.
     */
    if (isRefreshRequest) {
      api.dispatch(clearCredentials());
      return result;
    }

    /**
     * SCENARIO B: A standard API request failed.
     * We attempt a "Silent Refresh" in the background.
     */
    if (!isRefreshing) {
      isRefreshing = true;
      console.warn(
        "Access token expired/missing. Attempting silent refresh...",
      );

      const refreshResult = await rawBaseQuery(
        { url: "/auth/refresh", method: "POST" },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        console.log(
          "Token cookies rotated successfully. Retrying original request...",
        );

        // Signal that we are authenticated (Proof is in the new cookies)
        api.dispatch(setCredentials());

        // Retry the original query with the fresh cookies
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        /**
         * Refresh Failed: Either a new user (guest) or the session is truly dead.
         * We clear state so the UI knows they are a guest.
         * Navigation is left to the UI/Protected Routes.
         */
        api.dispatch(clearCredentials());
      }
      isRefreshing = false;
    }
  }

  return result;
};
