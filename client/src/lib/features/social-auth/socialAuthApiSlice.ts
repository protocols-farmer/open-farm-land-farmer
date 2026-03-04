// src/lib/features/social-auth/socialAuthApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { setCredentials } from "../auth/authSlice";
import { SocialAuthResponse } from "./socialTypes";

export const socialAuthApiSlice = createApi({
  reducerPath: "socialAuthApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /**
     * NEW: Finalizes the social login flow.
     * After the backend redirects to /auth/callback, the frontend calls this
     * to exchange the HttpOnly cookie for a JWT Access Token.
     */
    checkSocialStatus: builder.mutation<SocialAuthResponse, void>({
      query: () => ({
        url: "/social/status",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Synchronize the new Access Token into the global Auth state
          dispatch(setCredentials({ token: data.data.tokens.accessToken }));
        } catch (error) {
          // Failure handled by the callback page logic
        }
      },
    }),
  }),
});

export const { useCheckSocialStatusMutation } = socialAuthApiSlice;
