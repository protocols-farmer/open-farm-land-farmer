//src/lib/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authStorage } from "@/lib/auth/authStorage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Updates the access token in both Redux and LocalStorage.
     * Also marks hydration as complete.
     */
    setCredentials(state, action: PayloadAction<{ token: string | null }>) {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = !!token;
      state.isHydrated = true;

      if (token) {
        authStorage.setToken(token);
      }
    },

    /**
     * Specifically used during app boot if no token is found,
     * to signal that the initial check is finished.
     */
    completeHydration(state) {
      state.isHydrated = true;
    },

    /**
     * Clears all authentication state.
     */
    clearCredentials(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
      authStorage.clearStorage();
    },
  },
});

export const { setCredentials, clearCredentials, completeHydration } =
  authSlice.actions;

export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsHydrated = (state: { auth: AuthState }) =>
  state.auth.isHydrated;

export default authSlice.reducer;
