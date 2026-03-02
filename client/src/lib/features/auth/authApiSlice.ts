//src/lib/features/auth/authApiSlice.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { setCredentials, clearCredentials } from "./authSlice";
import type {
  LoginInputDto,
  SignUpInputDto,
  ChangePasswordInputDto,
  LoginApiResponse,
} from "./authTypes";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /**
     * Standard Email/Password Login
     */
    login: builder.mutation<LoginApiResponse, LoginInputDto>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.data.tokens.accessToken }));
        } catch (error) {
          // Error handled by component
        }
      },
    }),

    /**
     * Standard Email/Password Signup
     */
    signup: builder.mutation<LoginApiResponse, SignUpInputDto>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.data.tokens.accessToken }));
        } catch (error) {
          // Error handled by component
        }
      },
    }),

    /**
     * Logout of current session
     */
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Fallback: Clear locally even if server call fails
        } finally {
          dispatch(clearCredentials());
          // CRITICAL: Wipe the entire API cache so the next user starts fresh
          dispatch(authApiSlice.util.resetApiState());

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      },
    }),

    /**
     * Security: Logout of ALL active sessions
     */
    logoutAll: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout-all",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
          // CRITICAL: Wipe the entire API cache
          dispatch(authApiSlice.util.resetApiState());

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      },
    }),

    /**
     * Change password (Protected)
     */
    changePassword: builder.mutation<
      { message: string },
      ChangePasswordInputDto
    >({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useLogoutAllMutation,
} = authApiSlice;
