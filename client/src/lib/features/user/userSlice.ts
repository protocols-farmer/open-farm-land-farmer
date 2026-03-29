//src/lib/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApiSlice } from "./userApiSlice";
import { clearCredentials } from "../auth/authSlice";
import { authApiSlice } from "../auth/authApiSlice"; // 🚜 Make sure this is imported!
import type { RootState } from "../../store";
import type {
  SanitizedUserDto,
  UsersState,
  UpdateProfileApiResponse,
} from "./userTypes";

const initialState: UsersState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<SanitizedUserDto | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearCredentials, (state) => {
        state.currentUser = null;
      })

      // 🚜 ADD THIS BLOCK: Catch the user data the exact second they log in
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload.data?.user) {
            state.currentUser = action.payload.data.user;
          }
        },
      )

      .addMatcher(
        userApiSlice.endpoints.getMe.matchFulfilled,
        (state, action: PayloadAction<SanitizedUserDto>) => {
          state.currentUser = action.payload;
        },
      )
      .addMatcher(
        userApiSlice.endpoints.updateMyProfile.matchFulfilled,
        (state, action: PayloadAction<UpdateProfileApiResponse>) => {
          if (action.payload.data?.user) {
            state.currentUser = action.payload.data.user;
          }
        },
      )
      .addMatcher(
        authApiSlice.endpoints.verifyEmail.matchFulfilled,
        (state) => {
          if (state.currentUser) {
            state.currentUser.isEmailVerified = true;
          }
        },
      );
  },
});

export const { setCurrentUser } = userSlice.actions;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export default userSlice.reducer;
