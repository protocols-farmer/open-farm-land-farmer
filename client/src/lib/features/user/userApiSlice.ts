/**
 * src/lib/features/user/userApiSlice.ts
 * REFINED: Removed all NextAuth dependencies (getSession, signOut).
 * Now relies on Redux State for tokens and internal dispatch for cleanup.
 */

import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { clearCredentials } from "../auth/authSlice";
import { authStorage } from "@/lib/auth/authStorage";
import {
  uploadStarted,
  uploadProgressUpdated,
  uploadSucceeded,
  uploadFailed,
} from "../upload/uploadProgressSlice";
import type { RootState } from "../../store";
import type {
  SanitizedUserDto,
  GetMeApiResponse,
  UpdateProfileApiResponse,
  UserProfile,
} from "./userTypes";

export interface FollowerDto {
  id: string;
  name: string;
  username: string;
  profileImage: string | null;
  title: string | null;
}

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 3 });

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Me", "User", "Followers", "Following"],
  endpoints: (builder) => ({
    // Inside userApiSlice endpoints...

    getMe: builder.query<SanitizedUserDto, void>({
      query: () => "/user/me",

      transformResponse: (response: GetMeApiResponse) => response.data.user,
      providesTags: ["Me"],
      keepUnusedDataFor: 60,
    }),
    getUserByUsername: builder.query<UserProfile, string>({
      query: (username) => `/user/profile/${username}`,
      transformResponse: (response: { status: string; data: UserProfile }) =>
        response.data,
      providesTags: (result, _error, username) =>
        result
          ? [
              { type: "User", id: result.id },
              { type: "User", id: username },
              "User",
            ]
          : ["User"],
    }),

    followUser: builder.mutation<{ status: string; message: string }, string>({
      query: (userId) => ({
        url: `/follows/${userId}/follow`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, userId) => [
        "Me",
        { type: "User", id: userId },
        "Followers",
        "Following",
      ],
    }),

    unfollowUser: builder.mutation<{ status: string; message: string }, string>(
      {
        query: (userId) => ({
          url: `/follows/${userId}/unfollow`,
          method: "DELETE",
        }),
        invalidatesTags: (_result, _error, userId) => [
          "Me",
          { type: "User", id: userId },
          "Followers",
          "Following",
        ],
      },
    ),

    getFollowers: builder.query<
      { status: string; data: { follower: FollowerDto }[] },
      string
    >({
      query: (userId) => `/follows/${userId}/followers`,
      providesTags: ["Followers"],
    }),

    getFollowing: builder.query<
      { status: string; data: { following: FollowerDto }[] },
      string
    >({
      query: (userId) => `/follows/${userId}/following`,
      providesTags: ["Following"],
    }),

    updateMyProfile: builder.mutation<UpdateProfileApiResponse, FormData>({
      queryFn: async (formData, api, _extraOptions) => {
        const { dispatch, getState } = api;

        const state = getState() as RootState;
        const token = state.auth.token || authStorage.getToken();

        const file = (formData.get("profileImage") ||
          formData.get("bannerImage")) as File | null;

        const performUpload = (authToken: string) => {
          return new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(
              "PATCH",
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
            );
            xhr.setRequestHeader("Authorization", `Bearer ${authToken}`);

            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const progress = Math.round((event.loaded * 100) / event.total);
                dispatch(uploadProgressUpdated(progress));
              }
            };

            xhr.onload = () => {
              try {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status >= 200 && xhr.status < 300) {
                  dispatch(uploadSucceeded());
                  resolve(response);
                } else {
                  dispatch(uploadFailed(response.message || "Update failed"));
                  reject({ status: xhr.status, data: response });
                }
              } catch (e) {
                reject({
                  status: 500,
                  data: { message: "Invalid server response" },
                });
              }
            };

            xhr.onerror = () => {
              const errorMsg = "A network error occurred during upload.";
              dispatch(uploadFailed(errorMsg));
              reject({ status: "NETWORK_ERROR", data: { message: errorMsg } });
            };

            xhr.send(formData);
          });
        };

        try {
          if (!token) {
            throw {
              status: 401,
              data: { message: "Unauthorized. No token found." },
            };
          }

          dispatch(uploadStarted(file?.name || "Profile Update"));
          const result = await performUpload(token);
          return { data: result };
        } catch (error: any) {
          const status = error.status || 500;
          if (status === 401) {
            dispatch(clearCredentials());
            if (typeof window !== "undefined") {
              window.location.assign("/auth/login?error=SessionExpired");
            }
          }
          return { error: { status, data: error.data } };
        }
      },
      // REFINED: Invalidate all relevant tags to keep public and private views in sync
      invalidatesTags: (result) => [
        "Me",
        "User", // Invalidate general user list
        { type: "User", id: result?.data?.user?.username },
        { type: "User", id: result?.data?.user?.id },
      ],
    }),
    /**
     * Permanently deletes the user account.
     */
    deleteMyAccount: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/user/me", method: "DELETE" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          if (typeof window !== "undefined") {
            window.location.assign("/");
          }
        } catch (error) {
          // Keep local state if deletion fails? Or force clear?
          // Usually, for account deletion, we force clear regardless.
        }
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMyProfileMutation,
  useDeleteMyAccountMutation,
  useGetUserByUsernameQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = userApiSlice;
