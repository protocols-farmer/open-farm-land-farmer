//src/lib/features/auth/authApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { setCredentials, clearCredentials } from "./authSlice";
import type {
  LoginInputDto,
  SignUpInputDto,
  ChangePasswordInputDto,
  LoginApiResponse,
  ForgotPasswordInputDto,
  ResetPasswordInputDto,
  GeneralAuthResponse,
} from "./authTypes";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /**
     * Standard Email/Password Login
     * The backend now sets the Access and Refresh tokens via HttpOnly cookies.
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

          // If the request succeeded, the cookies are already in the browser.
          // We just signal to the authSlice that we are now authenticated.
          if (data.status === "success") {
            dispatch(setCredentials());
          }
        } catch (error) {
          // Errors are handled by the global error handler or component
        }
      },
    }),

    /**
     * Standard Email/Password Signup
     */
    signup: builder.mutation<LoginApiResponse, SignUpInputDto>({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.status === "success" || data.status === "warning") {
            dispatch(setCredentials());
          }
        } catch (error) {
          // Errors handled elsewhere
        }
      },
    }),

    /**
     * Logout of current session
     * The backend clearAuthCookies() will handle the cookie removal.
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
          // Even if the server-side logout fails, we clear local state
        } finally {
          dispatch(clearCredentials());
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

    /**
     * Request a password reset link
     */
    forgotPassword: builder.mutation<
      GeneralAuthResponse,
      ForgotPasswordInputDto
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    /**
     * Reset password using a token from email
     */
    resetPassword: builder.mutation<GeneralAuthResponse, ResetPasswordInputDto>(
      {
        query: (body) => ({
          url: "/auth/reset-password",
          method: "POST",
          body,
        }),
      },
    ),

    /**
     * Verify email via token (GET)
     */
    verifyEmail: builder.query<GeneralAuthResponse, string>({
      query: (token) => ({
        url: `/auth/verify-email`,
        params: { token },
        method: "GET",
      }),
    }),

    resendVerification: builder.mutation<GeneralAuthResponse, void>({
      query: () => ({
        url: "/auth/resend-verification",
        method: "POST",
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailQuery,
  useResendVerificationMutation,
} = authApiSlice;
