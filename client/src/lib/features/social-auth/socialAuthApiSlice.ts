import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { setCredentials } from "../auth/authSlice";
import { SocialAuthResponse } from "./socialTypes";

export const socialAuthApiSlice = createApi({
  reducerPath: "socialAuthApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /**
     * Finalizes the social login flow.
     * Exchanges the session cookie for the initial user data and token rotation.
     */
    checkSocialStatus: builder.mutation<SocialAuthResponse, void>({
      query: () => ({
        url: "/social/status",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // 🚜 SUCCESS: Signal the app that we are authenticated.
          // We don't pass a token here because it's handled via HttpOnly Cookies.
          dispatch(setCredentials());
        } catch (error) {
          // Failure is handled by the component or global error handler
        }
      },
    }),
  }),
});

export const { useCheckSocialStatusMutation } = socialAuthApiSlice;
