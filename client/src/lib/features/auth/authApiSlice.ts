//src/lib/features/auth/authApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { clearCredentials } from "./authSlice";
import { signOut } from "next-auth/react";
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
    login: builder.mutation<LoginApiResponse, LoginInputDto>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<any, SignUpInputDto>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
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
          // Even if the network call fails, we want to clear the local session
        } finally {
          dispatch(clearCredentials());
          signOut({ callbackUrl: "/" });
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
          signOut({ callbackUrl: "/" });
        }
      },
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
