import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/baseQueryWithReauth";
import {
  OpportunityDto,
  GetOpportunitiesParams,
  GetOpportunitiesResponse,
  GetOpportunityResponse,
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
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== "" &&
              value !== "All"
            ) {
              params.append(key, String(value));
            }
          });
        }
        return `/opportunities?${params.toString()}`;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { skip, ...filters } =
          (queryArgs as GetOpportunitiesParams) || {};
        return `${endpointName}(${JSON.stringify(filters)})`;
      },
      merge: (currentCache, newItems) => {
        if (newItems.pagination.currentPage === 1) {
          return newItems;
        }
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },

      // 🚜 ADD THIS BLOCK: Force network request when 'skip' or filters change
      forceRefetch({ currentArg, previousArg }) {
        // Using JSON.stringify ensures we catch changes deep in the object
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },

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

    createOpportunity: builder.mutation<OpportunityDto, FormData>({
      query: (formData) => ({
        url: "/opportunities",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: GetOpportunityResponse) => response.data,
      invalidatesTags: [{ type: "Opportunity", id: "LIST" }],
    }),

    updateOpportunity: builder.mutation<
      OpportunityDto,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/opportunities/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (response: GetOpportunityResponse) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Opportunity", id },
        { type: "Opportunity", id: "LIST" },
      ],
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
