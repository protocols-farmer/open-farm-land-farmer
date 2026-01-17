//src/lib/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApiSlice } from "./userApiSlice";
import { clearCredentials } from "../auth/authSlice";
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
    // Explicitly set the user (used by NextAuthSync for quick hydration)
    setCurrentUser: (state, action: PayloadAction<SanitizedUserDto | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Automatically wipe user data when the auth token is cleared
      .addCase(clearCredentials, (state) => {
        state.currentUser = null;
      })
      // When getMe succeeds, update the current user with full DB details
      .addMatcher(
        userApiSlice.endpoints.getMe.matchFulfilled,
        (state, action: PayloadAction<SanitizedUserDto>) => {
          state.currentUser = action.payload;
        }
      )
      // When the profile is updated, update the store with the new data
      // (This picks up the new timestamped image URLs for cache-busting)
      .addMatcher(
        userApiSlice.endpoints.updateMyProfile.matchFulfilled,
        (state, action: PayloadAction<UpdateProfileApiResponse>) => {
          if (action.payload.data?.user) {
            state.currentUser = action.payload.data.user;
          }
        }
      );
  },
});

export const { setCurrentUser } = userSlice.actions;

// Selector to use in your components: const user = useAppSelector(selectCurrentUser);
export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
