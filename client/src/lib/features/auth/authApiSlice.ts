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
    login: builder.mutation<LoginApiResponse, LoginInputDto>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.status === "success") {
            dispatch(setCredentials());
          }
        } catch (error) {}
      },
    }),

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
        } catch (error) {}
      },
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
        } finally {
          dispatch(clearCredentials());
          dispatch(authApiSlice.util.resetApiState());

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      },
    }),

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

          dispatch(authApiSlice.util.resetApiState());

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      },
    }),

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

    resetPassword: builder.mutation<GeneralAuthResponse, ResetPasswordInputDto>(
      {
        query: (body) => ({
          url: "/auth/reset-password",
          method: "POST",
          body,
        }),
      },
    ),

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
