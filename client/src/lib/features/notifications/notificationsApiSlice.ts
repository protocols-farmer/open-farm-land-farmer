import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";

export interface Notification {
  id: string;
  type: "NEW_FOLLOWER" | "POST_LIKE" | "COMMENT_REPLY"; // Matches your Backend Enum
  read: boolean;
  metadata: any;
  createdAt: string;
  sender: {
    id: string;
    username: string;
    name: string;
    profileImage: string | null;
  };
}

export const notificationsApiSlice = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notifications", "UnreadCount"],
  endpoints: (builder) => ({
    /**
     * Fetch the full list of notifications for the user.
     */
    getNotifications: builder.query<
      { status: string; data: Notification[] },
      void
    >({
      query: () => "/notifications",
      providesTags: ["Notifications"],
    }),

    /**
     * Fetch just the unread count (Used for Polling in the Navbar).
     */
    getUnreadCount: builder.query<
      { status: string; data: { unreadCount: number } },
      void
    >({
      query: () => "/notifications/unread-count",
      providesTags: ["UnreadCount"],
    }),

    /**
     * Mark a specific notification as read.
     */
    markAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "UnreadCount"],
    }),

    /**
     * Mark all notifications as read (e.g. "Clear All").
     */
    markAllAsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "UnreadCount"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationsApiSlice;
