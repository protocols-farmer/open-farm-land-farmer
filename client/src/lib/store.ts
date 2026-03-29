//src/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import uploadProgressReducer from "./features/upload/uploadProgressSlice";
import postReducer from "./features/post/postSlice";
import uiReducer from "./features/ui/uiSlice";
import commentUiReducer from "./features/comment/commentUiSlice";

import { userApiSlice } from "./features/user/userApiSlice";
import { authApiSlice } from "./features/auth/authApiSlice";
import { postApiSlice } from "./features/post/postApiSlice";
import { commentApiSlice } from "./features/comment/commentApiSlice";
import { opportunityApiSlice } from "./features/opportunities/opportunityApiSlice";
import { updateApiSlice } from "./features/updates/updateApiSlice";
import { projectUpdateApiSlice } from "./features/projectUpdate/projectUpdateApiSlice";
import { guideStepApiSlice } from "./features/guideSection/guideStepApiSlice";
import { guideSectionApiSlice } from "./features/guideSection/guideSectionApiSlice";
import { adminApiSlice } from "./features/admin/adminApiSlice";
import { notificationsApiSlice } from "./features/notifications/notificationsApiSlice";
import { socialAuthApiSlice } from "./features/social-auth/socialAuthApiSlice";
import { githubApiSlice } from "./features/github/githubApiSlice";
import { settingsApiSlice } from "./features/settings/settingsApiSlice";
import { appealApiSlice } from "./features/appeals/appealApiSlice";
/**
 * CENTRAL REDUX STORE
 * This is now the "Source of Truth" for the entire application,
 * replacing NextAuth session management.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    uploadProgress: uploadProgressReducer,
    post: postReducer,
    ui: uiReducer,
    commentUi: commentUiReducer,

    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [socialAuthApiSlice.reducerPath]: socialAuthApiSlice.reducer,
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
    [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
    [appealApiSlice.reducerPath]: appealApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApiSlice.middleware,
      authApiSlice.middleware,
      postApiSlice.middleware,
      commentApiSlice.middleware,
      opportunityApiSlice.middleware,
      updateApiSlice.middleware,
      projectUpdateApiSlice.middleware,
      guideStepApiSlice.middleware,
      adminApiSlice.middleware,
      guideSectionApiSlice.middleware,
      notificationsApiSlice.middleware,
      socialAuthApiSlice.middleware,
      githubApiSlice.middleware,
      settingsApiSlice.middleware,
      appealApiSlice.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
