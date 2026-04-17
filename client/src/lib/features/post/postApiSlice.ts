//src/lib/features/post/postApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import {
  PostDto,
  GetPostApiResponse,
  GetPostsApiResponse,
  GetPostsArgs,
  CreatePostApiResponse,
  UpdatePostApiResponse,
  GetTagsApiResponse,
  GetTagsArgs,
  LikePostApiResponse,
  SavePostApiResponse,
  SharePostApiRequest,
  SharePostApiResponse,
} from "./postTypes";
import type { RootState } from "../../store";

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "Posts", "Tags"],
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsApiResponse, GetPostsArgs | void>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, String(value));
            }
          });
        }
        return `/posts?${params.toString()}`;
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, ...filters } = (queryArgs as GetPostsArgs) || {};
        return `${endpointName}(${JSON.stringify(filters)})`;
      },

      merge: (currentCache, newItems) => {
        if (newItems.pagination.currentPage === 1) {
          return newItems;
        }
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    getPostById: builder.query<PostDto, string>({
      query: (postId) => `/posts/${postId}`,
      transformResponse: (response: GetPostApiResponse) => {
        return response.data;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Post", id: result.id },
              { type: "Post", id: arg },
            ]
          : [{ type: "Post", id: arg }],
    }),

    getTags: builder.query<GetTagsApiResponse, GetTagsArgs | void>({
      query: (args) => {
        if (!args) {
          return "/tags";
        }

        const params = new URLSearchParams();

        if (args.context) {
          params.append("context", args.context);
        }

        if (args.category) {
          params.append("category", args.category);
        }
        if (args.likedByUserId) {
          params.append("likedByUserId", args.likedByUserId);
        }
        if (args.savedByUserId) {
          params.append("savedByUserId", args.savedByUserId);
        }
        if (args.authorId) {
          params.append("authorId", args.authorId);
        }

        return `/tags?${params.toString()}`;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ name }) => ({
                type: "Tags" as const,
                id: name,
              })),
              { type: "Tags", id: "LIST" },
            ]
          : [{ type: "Tags", id: "LIST" }],
    }),

    createPost: builder.mutation<CreatePostApiResponse, FormData>({
      query: (formData) => ({ url: "/posts", method: "POST", body: formData }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: builder.mutation<
      UpdatePostApiResponse,
      { postId: string; formData: FormData }
    >({
      query: ({ postId, formData }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (r, e, { postId }) => [
        { type: "Post", id: postId },
        { type: "Posts", id: "LIST" },
      ],
    }),
    deletePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({ url: `/posts/${postId}`, method: "DELETE" }),
      invalidatesTags: ["Posts", "Post"],
    }),

    likePost: builder.mutation<LikePostApiResponse, string>({
      query: (postId) => ({ url: `/posts/${postId}/like`, method: "POST" }),

      invalidatesTags: (result, error, postId) => [
        { type: "Post", id: postId },
        { type: "Posts", id: "LIST" },
        { type: "Tags", id: "LIST" },
      ],
    }),

    unlikePost: builder.mutation<LikePostApiResponse, string>({
      query: (postId) => ({ url: `/posts/${postId}/like`, method: "DELETE" }),

      invalidatesTags: (result, error, postId) => [
        { type: "Post", id: postId },
        { type: "Posts", id: "LIST" },
        { type: "Tags", id: "LIST" },
      ],
    }),

    savePost: builder.mutation<SavePostApiResponse, string>({
      query: (postId) => ({ url: `/posts/${postId}/save`, method: "POST" }),

      invalidatesTags: (result, error, postId) => [
        { type: "Post", id: postId },
        { type: "Posts", id: "LIST" },
        { type: "Tags", id: "LIST" },
      ],
    }),
    unsavePost: builder.mutation<SavePostApiResponse, string>({
      query: (postId) => ({ url: `/posts/${postId}/save`, method: "DELETE" }),

      invalidatesTags: (result, error, postId) => [
        { type: "Post", id: postId },
        { type: "Posts", id: "LIST" },
        { type: "Tags", id: "LIST" },
      ],
    }),

    sharePost: builder.mutation<SharePostApiResponse, SharePostApiRequest>({
      query: ({ postId, platform }) => ({
        url: `/posts/${postId}/share`,
        method: "POST",
        body: { platform },
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled, getState }) {
        const patchResults: any[] = [];
        patchResults.push(
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPostById",
              postId,
              (draft) => {
                if (draft) {
                  draft.sharesCount++;
                }
              },
            ),
          ),
        );
        const queries = (getState() as RootState).postApi.queries;
        for (const key in queries) {
          if (key.startsWith("getPosts(")) {
            dispatch(
              postApiSlice.util.updateQueryData(
                "getPosts",
                queries[key]?.originalArgs,
                (draft) => {
                  const post = draft.data.find((p) => p.id === postId);
                  if (post) {
                    post.sharesCount++;
                  }
                },
              ),
            );
          }
        }
        try {
          const { data: shareData } = await queryFulfilled;
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPostById",
              postId,
              (draft) => {
                if (draft) {
                  draft.sharesCount = shareData.data.sharesCount;
                }
              },
            ),
          );
          for (const key in queries) {
            if (key.startsWith("getPosts(")) {
              dispatch(
                postApiSlice.util.updateQueryData(
                  "getPosts",
                  queries[key]?.originalArgs,
                  (draft) => {
                    const post = draft.data.find((p) => p.id === postId);
                    if (post) {
                      post.sharesCount = shareData.data.sharesCount;
                    }
                  },
                ),
              );
            }
          }
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),
    recordPostView: builder.mutation<void, string>({
      query: (postId) => ({ url: `/posts/${postId}/view`, method: "POST" }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetTagsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useSharePostMutation,
  useRecordPostViewMutation,
} = postApiSlice;
