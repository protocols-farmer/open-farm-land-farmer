//src/lib/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;

  /**
   * Tracks if the application has finished its initial session check.
   */
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
    /**
     * Marks the user as logged in.
     * The actual "proof" of authentication is the HttpOnly cookie
     * stored in the browser, not a string in Redux.
     */
    setCredentials(state) {
      state.isAuthenticated = true;
      state.isHydrated = true;
    },

    /**
     * Signals that the app boot process (session check) is complete,
     * regardless of whether the user is logged in or a guest.
     */
    completeHydration(state) {
      state.isHydrated = true;
    },

    /**
     * Clears local authentication flags.
     * Note: The server-side cookies are cleared via the logout API call.
     */
    clearCredentials(state) {
      state.isAuthenticated = false;
      state.isHydrated = true;
    },
  },
});

export const { setCredentials, clearCredentials, completeHydration } =
  authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsHydrated = (state: { auth: AuthState }) =>
  state.auth.isHydrated;

export default authSlice.reducer;
