// =================================================================
// FILE: src/lib/store.ts (Corrected Version)
// =================================================================
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Reducers
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import uploadProgressReducer from "./features/upload/uploadProgressSlice";
import postReducer from "./features/post/postSlice";
import uiReducer from "./features/ui/uiSlice";
import commentUiReducer from "./features/comment/commentUiSlice";

// API Slices
import { commentApiSlice } from "./features/comment/commentApiSlice";
import { userApiSlice } from "./features/user/userApiSlice";
import { authApiSlice } from "./features/auth/authApiSlice";
import { postApiSlice } from "./features/post/postApiSlice";
import { opportunityApiSlice } from "./features/opportunities/opportunityApiSlice";
import { updateApiSlice } from "./features/updates/updateApiSlice";
import { projectUpdateApiSlice } from "./features/projectUpdate/projectUpdateApiSlice";
import { guideStepApiSlice } from "./features/guideSection/guideStepApiSlice";
import { guideSectionApiSlice } from "./features/guideSection/guideSectionApiSlice"; // Correctly imported
import { adminApiSlice } from "./features/admin/adminApiSlice";
import { notificationsApiSlice } from "./features/notifications/notificationsApiSlice";
import { githubApiSlice } from "./features/github/githubApiSlice";
export const store = configureStore({
  reducer: {
    // Standard Reducers
    auth: authReducer,
    user: userReducer,
    uploadProgress: uploadProgressReducer,
    post: postReducer,
    ui: uiReducer,
    commentUi: commentUiReducer,

    // RTK Query Reducers
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [commentApiSlice.reducerPath]: commentApiSlice.reducer,
    [opportunityApiSlice.reducerPath]: opportunityApiSlice.reducer,
    [updateApiSlice.reducerPath]: updateApiSlice.reducer,
    [projectUpdateApiSlice.reducerPath]: projectUpdateApiSlice.reducer,
    [guideStepApiSlice.reducerPath]: guideStepApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    [guideSectionApiSlice.reducerPath]: guideSectionApiSlice.reducer,
    [notificationsApiSlice.reducerPath]: notificationsApiSlice.reducer,
    [githubApiSlice.reducerPath]: githubApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Chain all middleware correctly using .concat()
    getDefaultMiddleware()
      .concat(userApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(postApiSlice.middleware)
      .concat(commentApiSlice.middleware)
      .concat(opportunityApiSlice.middleware)
      .concat(updateApiSlice.middleware)
      .concat(projectUpdateApiSlice.middleware)
      .concat(guideStepApiSlice.middleware)
      .concat(adminApiSlice.middleware)
      .concat(guideSectionApiSlice.middleware)
      .concat(notificationsApiSlice.middleware)
      .concat(githubApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
