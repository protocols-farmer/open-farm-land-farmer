//src/lib/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;

  isHydrated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state) {
      state.isAuthenticated = true;
      state.isHydrated = true;
    },

    completeHydration(state) {
      state.isHydrated = true;
    },

    clearCredentials(state) {
      state.isAuthenticated = false;
      state.isHydrated = true;
    },
  },
});

export const { setCredentials, clearCredentials, completeHydration } =
  authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsHydrated = (state: { auth: AuthState }) =>
  state.auth.isHydrated;

export default authSlice.reducer;
