//src/lib/api/baseQueryWithReauth.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { setCredentials, clearCredentials } from "../features/auth/authSlice";

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("X-Requested-With", "XMLHttpRequest");
      return headers;
    },
  });

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    return result;
  }

  if (result.error && result.error.status === 401) {
    const isRefreshRequest =
      (typeof args === "string" && args.includes("/auth/refresh")) ||
      (typeof args !== "string" && args.url === "/auth/refresh");

    if (isRefreshRequest) {
      api.dispatch(clearCredentials());
      return result;
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
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

          api.dispatch(setCredentials());

          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearCredentials());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
