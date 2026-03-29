import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setCredentials, clearCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";

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

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    return result;
  }

  if (result.error && result.error.status === 401) {
    const isRefreshRequest =
      (typeof args === "string" && args.includes("/auth/refresh")) ||
      (typeof args !== "string" && args.url === "/auth/refresh");

    /**
     * THE UNIVERSAL GUARD:
     * 1. If the refresh request itself failed (401), stop immediately.
     * 2. If no token exists in Redux, it's a guest request. Do not attempt refresh.
     * This kills loops on the Login page AND all other pages.
     */
    if (isRefreshRequest || !token) {
      if (token || isRefreshRequest) {
        api.dispatch(clearCredentials());

        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          if (!currentPath.includes("/auth/login")) {
            window.location.replace("/auth/login?status=session_expired");
          }
        }
      }
      return result;
    }

    if (!isRefreshing) {
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

          const retryBaseQuery = fetchBaseQuery({
            baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
            prepareHeaders: (h) => h.set("authorization", `Bearer ${newToken}`),
            credentials: "include",
          });
          result = await retryBaseQuery(args, api, extraOptions);
        }
      } else {
        console.error("Session expired or DB reset. Logging out.");
        api.dispatch(clearCredentials());

        if (typeof window !== "undefined") {
          if (!window.location.pathname.includes("/auth/login")) {
            window.location.replace("/auth/login?status=session_expired");
          }
        }
      }
      isRefreshing = false;
    }
  }

  return result;
};
