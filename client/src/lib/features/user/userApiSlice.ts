//src/lib/features/user/userApiSlice.ts
import { createApi, retry } from "@reduxjs/toolkit/query/react";
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
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

export interface FollowerDto {
  id: string;
  name: string;
  username: string;
  profileImage: string | null;
  title: string | null;
}

const baseQueryWithRetry = (retry as any)(baseQueryWithReauth, {
  maxRetries: 3,
  retryCondition: (error: any) => {
    const status = error?.status;
    return status !== 401 && status !== 403 && status !== 429;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Me", "User", "Followers", "Following"],
  endpoints: (builder) => ({
    getMe: builder.query<SanitizedUserDto, void>({
      query: () => "/user/me",
      transformResponse: (response: GetMeApiResponse) => response.data.user,
      providesTags: ["Me"],
      keepUnusedDataFor: 60,
    }),

    getUserByUsername: builder.query<UserProfile, string>({
      query: (username) => `/user/profile/${username}`,
      transformResponse: (response: {
        status: string;
        data: { user: UserProfile };
      }) => response.data.user,
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
        const { dispatch } = api;

        const file = (formData.get("profileImage") ||
          formData.get("bannerImage")) as File | null;

        const performUpload = () => {
          return new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(
              "PATCH",
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
            );

            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
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
                } else if (xhr.status === 401) {
                  reject({ status: 401, data: response });
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
          let result;

          try {
            result = await performUpload();
          } catch (initialError: any) {
            if (initialError.status === 401) {
              console.warn(
                "XHR upload hit 401. Attempting manual token refresh...",
              );

              const refreshResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh`,
                {
                  method: "POST",
                  credentials: "include",
                },
              );

              if (refreshResponse.ok) {
                console.log(
                  "XHR refresh successful. Retrying profile upload...",
                );

                dispatch(uploadProgressUpdated(0));
                result = await performUpload();
              } else {
                throw initialError;
              }
            } else {
              throw initialError;
            }
          }

          return { data: result };
        } catch (error: any) {
          const status = error.status || 500;
          if (status === 401) {
            dispatch(uploadFailed("Session expired."));
            dispatch(clearCredentials());
          }
          return { error: { status, data: error.data } };
        }
      },
      invalidatesTags: (result) => [
        "Me",
        "User",
        { type: "User", id: result?.data?.user?.username },
        { type: "User", id: result?.data?.user?.id },
      ],
    }),

    deleteMyAccount: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/user/me", method: "DELETE" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          if (typeof window !== "undefined") {
            window.location.assign("/");
          }
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
