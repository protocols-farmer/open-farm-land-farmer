//src/lib/api/baseQueryWithReauth.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setCredentials, clearCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";

// A mutex-like flag to prevent multiple refresh calls at once
let isRefreshing = false;

/**
 * Custom base query that handles automatic JWT token injection
 * and manual Refresh Token Rotation.
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const token = state.auth.token;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  });

  // 1. Attempt the original request
  let result = await rawBaseQuery(args, api, extraOptions);

  // 2. Handle 401 Unauthorized
  if (result.error && result.error.status === 401) {
    // If the request itself was the refresh call, don't try to refresh again!
    const isRefreshRequest =
      typeof args !== "string" && args.url === "/auth/refresh";

    if (!isRefreshing && !isRefreshRequest) {
      isRefreshing = true;
      console.warn("Access token expired. Attempting manual refresh...");

      const refreshResult = await rawBaseQuery(
        { url: "/auth/refresh", method: "POST" },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as any;
        const newToken = data.data?.accessToken;

        if (newToken) {
          console.log("Token refreshed successfully.");
          api.dispatch(setCredentials({ token: newToken }));

          // Retry the original request with the new token
          const retryBaseQuery = fetchBaseQuery({
            baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
            prepareHeaders: (h) => h.set("authorization", `Bearer ${newToken}`),
            credentials: "include",
          });
          result = await retryBaseQuery(args, api, extraOptions);
        }
      } else {
        // Refresh failed (Session expired or refresh token revoked)
        console.error("Session expired. Logging out.");
        api.dispatch(clearCredentials());

        if (typeof window !== "undefined") {
          // Break the React lifecycle and force a hard redirect
          window.location.href = "/auth/login?status=session_expired";
        }
      }
      isRefreshing = false;
    }
  }

  return result;
};
