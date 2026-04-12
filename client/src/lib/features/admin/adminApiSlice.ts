//src/lib/features/admin/adminApiSlice.ts
import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import {
  AdminApiQuery,
  GetAdminStatsResponse,
  GetAdminUsersResponse,
  GetAdminPostsResponse,
  GetAdminCommentsResponse,
  SystemRole,
  GetSystemConfigResponse,
  UpdateSystemConfigArgs,
  GetAdminUpdatesResponse,
  GetAdminOpportunitiesResponse,
  UserStatus,
  AdminUserRow,
} from "./adminTypes";

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 3 });

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "AdminStats",
    "AdminUsers",
    "AdminPosts",
    "AdminComments",
    "AdminOpportunities",
    "AdminUpdates",
  ],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<GetAdminStatsResponse, void>({
      query: () => "/admin/stats",
      providesTags: ["AdminStats"],
    }),
    getAdminUsers: builder.query<GetAdminUsersResponse, AdminApiQuery>({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });
        return `/admin/users?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.users.map(({ id }) => ({
                type: "AdminUsers" as const,
                id,
              })),
              { type: "AdminUsers", id: "LIST" },
            ]
          : [{ type: "AdminUsers", id: "LIST" }],
    }),
    getAdminPosts: builder.query<GetAdminPostsResponse, AdminApiQuery>({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, String(value));
        });
        return `/admin/posts?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.posts.map(({ id }) => ({
                type: "AdminPosts" as const,
                id,
              })),
              { type: "AdminPosts", id: "LIST" },
            ]
          : [{ type: "AdminPosts", id: "LIST" }],
    }),
    getAdminComments: builder.query<GetAdminCommentsResponse, AdminApiQuery>({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, String(value));
        });
        return `/admin/comments?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.comments.map(({ id }) => ({
                type: "AdminComments" as const,
                id,
              })),
              { type: "AdminComments", id: "LIST" },
            ]
          : [{ type: "AdminComments", id: "LIST" }],
    }),

    // 🚜 UPDATED: Returns the updated user object with the new success flag
    updateUserRole: builder.mutation<
      { success: boolean; data: AdminUserRow },
      { userId: string; role: SystemRole }
    >({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result) =>
        result?.success ? [{ type: "AdminUsers", id: "LIST" }] : [],
    }),

    // 🚜 FIXED: Backend returns 204 No Content, so response type is void
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({ url: `/admin/users/${userId}`, method: "DELETE" }),
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({ url: `/admin/posts/${postId}`, method: "DELETE" }),
      invalidatesTags: ["AdminPosts", "AdminStats"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/admin/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminComments", "AdminStats"],
    }),

    getSystemConfig: builder.query<GetSystemConfigResponse, void>({
      query: () => "/admin/system-config",
      providesTags: ["AdminStats"],
      keepUnusedDataFor: 300,
    }),

    updateSystemConfig: builder.mutation<
      GetSystemConfigResponse,
      UpdateSystemConfigArgs
    >({
      query: (body) => ({
        url: "/admin/system-config",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminStats"],
    }),

    getAdminOpportunities: builder.query<
      GetAdminOpportunitiesResponse,
      AdminApiQuery
    >({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, String(value));
        });
        return `/admin/opportunities?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.opportunities.map(({ id }) => ({
                type: "AdminOpportunities" as const,
                id,
              })),
              { type: "AdminOpportunities", id: "LIST" },
            ]
          : [{ type: "AdminOpportunities", id: "LIST" }],
    }),

    getAdminUpdates: builder.query<GetAdminUpdatesResponse, AdminApiQuery>({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, String(value));
        });
        return `/admin/updates?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.updates.map(({ id }) => ({
                type: "AdminUpdates" as const,
                id,
              })),
              { type: "AdminUpdates", id: "LIST" },
            ]
          : [{ type: "AdminUpdates", id: "LIST" }],
    }),

    deleteOpportunity: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/opportunities/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminOpportunities", "AdminStats"],
    }),

    deleteUpdate: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/updates/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminUpdates", "AdminStats"],
    }),

    // 🚜 UPDATED: Returns the updated user object
    updateUserStatus: builder.mutation<
      { success: boolean; data: AdminUserRow },
      {
        userId: string;
        status: UserStatus;
        reason?: string;
        expiresAt?: string | null;
      }
    >({
      query: ({ userId, status, reason, expiresAt }) => ({
        url: `/admin/users/${userId}/status`,
        method: "PATCH",
        body: { status, reason, expiresAt },
      }),
      invalidatesTags: (result) =>
        result?.success ? [{ type: "AdminUsers", id: "LIST" }] : [],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminPostsQuery,
  useGetAdminCommentsQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
  useGetSystemConfigQuery,
  useUpdateSystemConfigMutation,
  useGetAdminOpportunitiesQuery,
  useGetAdminUpdatesQuery,
  useDeleteOpportunityMutation,
  useDeleteUpdateMutation,
  useUpdateUserStatusMutation,
} = adminApiSlice;
