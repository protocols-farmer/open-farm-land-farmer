import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { postApiSlice } from "../post/postApiSlice";
import { GuideStepDto } from "./guideTypes";

export const guideStepApiSlice = createApi({
  reducerPath: "guideStepApi",
  baseQuery: baseQueryWithReauth,
  // 🚜 REQUIRED: This allows the slice to communicate with postApi tags
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    addGuideStep: builder.mutation<
      { data: GuideStepDto },
      { postId: string; data: any }
    >({
      query: ({ postId, data }) => ({
        url: `/posts/${postId}/steps`,
        method: "POST",
        body: data,
      }),
      // 🚜 FIX: Force refetch of the post data if manual update fails
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPostById",
              postId,
              (draft) => {
                if (!draft.steps) draft.steps = [];
                // Check if already added via refetch to avoid duplicates
                const exists = draft.steps.find((s) => s.id === result.data.id);
                if (!exists) {
                  draft.steps.push({ ...result.data, sections: [] });
                  draft.steps.sort((a, b) => a.order - b.order);
                }
              },
            ),
          );
        } catch (error) {
          console.error("Manual cache update failed for addGuideStep:", error);
        }
      },
    }),

    updateGuideStep: builder.mutation<
      { data: GuideStepDto },
      { stepId: string; postId: string; data: any }
    >({
      query: ({ stepId, data }) => ({
        url: `/steps/${stepId}`,
        method: "PUT",
        body: data,
      }),
      // 🚜 FIX: Force refetch of the post data if manual update fails
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
      async onQueryStarted({ postId, stepId }, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPostById",
              postId,
              (draft) => {
                const stepIndex = draft.steps.findIndex((s) => s.id === stepId);
                if (stepIndex !== -1) {
                  // Merge result to preserve the 'sections' array in local state
                  Object.assign(draft.steps[stepIndex], result.data);
                  draft.steps.sort((a, b) => a.order - b.order);
                }
              },
            ),
          );
        } catch (error) {
          console.error(
            "Manual cache update failed for updateGuideStep:",
            error,
          );
        }
      },
    }),

    deleteGuideStep: builder.mutation<void, { stepId: string; postId: string }>(
      {
        query: ({ stepId }) => ({ url: `/steps/${stepId}`, method: "DELETE" }),
        // 🚜 FIX: Force refetch of the post data if manual update fails
        invalidatesTags: (result, error, { postId }) => [
          { type: "Post", id: postId },
        ],
        async onQueryStarted({ postId, stepId }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            postApiSlice.util.updateQueryData(
              "getPostById",
              postId,
              (draft) => {
                draft.steps = draft.steps.filter((s) => s.id !== stepId);
              },
            ),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      },
    ),
  }),
});

export const {
  useAddGuideStepMutation,
  useUpdateGuideStepMutation,
  useDeleteGuideStepMutation,
} = guideStepApiSlice;
