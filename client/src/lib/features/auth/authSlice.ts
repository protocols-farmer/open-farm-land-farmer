//src/lib/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Called by NextAuthSync when a token is found or refreshed
    setCredentials(state, action: PayloadAction<{ token: string | null }>) {
      state.token = action.payload.token;
    },
    // Unified action to clear the token
    clearCredentials(state) {
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
