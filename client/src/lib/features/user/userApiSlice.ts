// src/lib/features/user/userApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { clearCredentials } from "../auth/authSlice";
import {
  uploadStarted,
  uploadProgressUpdated,
  uploadSucceeded,
  uploadFailed,
} from "../upload/uploadProgressSlice";
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

/**
 * RTK Query slice for user-related API operations.
 * Handles profile fetching, updates, follow interactions, and image uploads.
 */
export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "User", "Followers", "Following"],
  endpoints: (builder) => ({
    /**
     * Fetches the currently authenticated user's full private profile.
     */
    getMe: builder.query<SanitizedUserDto, void>({
      query: () => "/user/me",
      transformResponse: (response: GetMeApiResponse) => response.data.user,
      providesTags: ["Me"],
      keepUnusedDataFor: 60,
    }),

    /**
     * Fetches a public user profile by username.
     * Maps both username and UUID to tags to ensure cross-slice invalidation works.
     */
    // Inside userApiSlice.ts
    getUserByUsername: builder.query<UserProfile, string>({
      query: (username) => `/user/profile/${username}`,
      transformResponse: (response: { status: string; data: UserProfile }) =>
        response.data,
      providesTags: (result, _error, username) =>
        result
          ? [
              { type: "User", id: result.id }, // <--- THIS LINK IS THE FIX (UUID)
              { type: "User", id: username }, // Keeps the username tag for the query
              "User",
            ]
          : ["User"],
    }),

    /**
     * Follow a user and refresh the profile cache.
     */
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

    /**
     * Unfollow a user and refresh the profile cache.
     */
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
      }
    ),

    /**
     * Fetch list of followers for a specific user.
     */
    getFollowers: builder.query<
      { status: string; data: { follower: FollowerDto }[] },
      string
    >({
      query: (userId) => `/follows/${userId}/followers`,
      providesTags: ["Followers"],
    }),

    /**
     * Fetch list of users a specific person is following.
     */
    getFollowing: builder.query<
      { status: string; data: { following: FollowerDto }[] },
      string
    >({
      query: (userId) => `/follows/${userId}/following`,
      providesTags: ["Following"],
    }),

    /**
     * Updates profile data/images with real-time upload progress.
     */
    updateMyProfile: builder.mutation<UpdateProfileApiResponse, FormData>({
      queryFn: async (formData, api, _extraOptions) => {
        const { dispatch } = api;
        const file = (formData.get("profileImage") ||
          formData.get("bannerImage")) as File | null;

        const performUpload = (token: string) => {
          return new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(
              "PATCH",
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`
            );
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);

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
          dispatch(uploadStarted(file?.name || "Profile Update"));
          const session = await getSession();
          if (!session?.backendAccessToken) {
            throw {
              status: 401,
              data: { message: "Session expired. Please log in again." },
            };
          }
          const result = await performUpload(session.backendAccessToken);
          return { data: result };
        } catch (error: any) {
          const status = error.status || 500;
          if (status === 401)
            signOut({ callbackUrl: "/auth/login?error=SessionExpired" });
          return { error: { status, data: error.data } };
        }
      },
      invalidatesTags: (result) => [
        "Me",
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
          signOut({ callbackUrl: "/" });
        } catch (error) {}
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
