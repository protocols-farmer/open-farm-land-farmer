// src/lib/features/appeals/appealApiSlice.ts
import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import type {
  SubmitAppealRequest,
  SubmitAppealResponse,
  AdminAppealQuery,
  GetAdminAppealsResponse,
  ReviewAppealRequest,
  ReviewAppealResponse,
} from "./appealTypes";

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 3 });

export const appealApiSlice = createApi({
  reducerPath: "appealApi",
  baseQuery: baseQueryWithRetry,
  // We use tags to automatically refresh tables when actions are taken
  tagTypes: ["Appeals", "AdminUsers", "Me"],
  endpoints: (builder) => ({
    // ==========================================
    // 1. USER ENDPOINTS
    // ==========================================
    submitAppeal: builder.mutation<SubmitAppealResponse, SubmitAppealRequest>({
      query: (body) => ({
        url: "/appeals",
        method: "POST",
        body,
      }),
      // Invalidate 'Me' so the user's local state updates to reflect they've appealed
      invalidatesTags: ["Me"],
    }),

    // ==========================================
    // 2. ADMIN ENDPOINTS
    // ==========================================
    getAdminAppeals: builder.query<GetAdminAppealsResponse, AdminAppealQuery>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.page) params.append("page", String(args.page));
        if (args.limit) params.append("limit", String(args.limit));
        if (args.status) params.append("status", args.status);
        if (args.q) params.append("q", args.q);

        return `/appeals/admin?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.appeals.map(({ id }) => ({
                type: "Appeals" as const,
                id,
              })),
              { type: "Appeals", id: "LIST" },
            ]
          : [{ type: "Appeals", id: "LIST" }],
    }),

    reviewAppeal: builder.mutation<
      ReviewAppealResponse,
      { id: string; data: ReviewAppealRequest }
    >({
      query: ({ id, data }) => ({
        url: `/appeals/admin/${id}/review`,
        method: "PATCH",
        body: data,
      }),
      // When an appeal is reviewed, refresh the Appeals table AND the User Management table
      invalidatesTags: [
        { type: "Appeals", id: "LIST" },
        { type: "AdminUsers", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useSubmitAppealMutation,
  useGetAdminAppealsQuery,
  useReviewAppealMutation,
} = appealApiSlice;
