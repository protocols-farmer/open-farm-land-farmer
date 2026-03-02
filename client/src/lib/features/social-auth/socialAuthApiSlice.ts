import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { setCredentials } from "../auth/authSlice";
import { SocialAuthResponse, SocialLoginInput } from "./socialTypes";

export const socialAuthApiSlice = createApi({
  reducerPath: "socialAuthApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /**
     * Exchange Google Auth Code for Session
     * Hits: GET /api/v1/social/google/callback?code=...
     */
    loginWithGoogle: builder.mutation<SocialAuthResponse, SocialLoginInput>({
      query: ({ code }) => ({
        url: `/social/google/callback?code=${code}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Syncs the new token into your main Auth state
          dispatch(setCredentials({ token: data.data.tokens.accessToken }));
        } catch (error) {
          // Error handling happens in the component/page
        }
      },
    }),

    /**
     * Exchange GitHub Auth Code for Session
     * Hits: GET /api/v1/social/github/callback?code=...
     */
    loginWithGithub: builder.mutation<SocialAuthResponse, SocialLoginInput>({
      query: ({ code }) => ({
        url: `/social/github/callback?code=${code}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.data.tokens.accessToken }));
        } catch (error) {
          // Error handling happens in the component/page
        }
      },
    }),
  }),
});

export const { useLoginWithGoogleMutation, useLoginWithGithubMutation } =
  socialAuthApiSlice;
