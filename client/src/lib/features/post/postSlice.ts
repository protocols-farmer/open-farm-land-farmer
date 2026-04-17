//src/lib/features/post/postSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postApiSlice } from "./postApiSlice";
import { PostsState, GetPostsApiResponse } from "./postTypes";

const initialState: PostsState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      postApiSlice.endpoints.getPosts.matchFulfilled,
      (state, action: PayloadAction<GetPostsApiResponse>) => {
        state.posts = action.payload.data;
      },
    );
  },
});

export default postSlice.reducer;
