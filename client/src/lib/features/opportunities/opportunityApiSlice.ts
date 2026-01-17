// =================================================================
// FILE: src/lib/features/opportunities/opportunityApiSlice.ts
// =================================================================
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/baseQueryWithReauth";
import {
  OpportunityDto,
  GetOpportunitiesParams,
  GetOpportunitiesResponse,
  GetOpportunityResponse,
  CreateOpportunityPayload,
  UpdateOpportunityPayload,
} from "./opportunityTypes";

export const opportunityApiSlice = createApi({
  reducerPath: "opportunityApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Opportunity"],
  endpoints: (builder) => ({
    getOpportunities: builder.query<
      GetOpportunitiesResponse,
      GetOpportunitiesParams | void
    >({
      query: (params) => ({ url: "/opportunities", params: params || {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Opportunity" as const,
                id,
              })),
              { type: "Opportunity", id: "LIST" },
            ]
          : [{ type: "Opportunity", id: "LIST" }],
    }),
    getOpportunity: builder.query<OpportunityDto, string>({
      query: (id) => `/opportunities/${id}`,
      transformResponse: (response: GetOpportunityResponse) => response.data,
      providesTags: (result, error, id) => [{ type: "Opportunity", id }],
    }),
    createOpportunity: builder.mutation<
      OpportunityDto,
      CreateOpportunityPayload
    >({
      query: (body) => ({ url: "/opportunities", method: "POST", body }),
      transformResponse: (response: GetOpportunityResponse) => response.data,
      invalidatesTags: [{ type: "Opportunity", id: "LIST" }],
    }),
    updateOpportunity: builder.mutation<
      OpportunityDto,
      UpdateOpportunityPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/opportunities/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: GetOpportunityResponse) => response.data,
      invalidatesTags: (result, error, { id }) => [{ type: "Opportunity", id }],
    }),
    deleteOpportunity: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/opportunities/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Opportunity", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOpportunitiesQuery,
  useGetOpportunityQuery,
  useCreateOpportunityMutation,
  useUpdateOpportunityMutation,
  useDeleteOpportunityMutation,
} = opportunityApiSlice;
