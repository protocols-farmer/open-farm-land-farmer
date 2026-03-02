/**
 * src/lib/auth/authStorage.ts
 * * Foundational utility for managing JWT tokens in the browser.
 * Wraps localStorage with SSR safety checks.
 */

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorage = {
  /**
   * Saves the access token to localStorage.
   */
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  /**
   * Retrieves the access token from localStorage.
   */
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  /**
   * Saves the refresh token to localStorage.
   * Note: While we use HttpOnly cookies for rotation, storing it here
   * can be a fallback for manual refresh calls in poly-repo setups.
   */
  setRefreshToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  },

  /**
   * Clears all auth data from the browser.
   */
  clearStorage: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      // Optional: clear any other user-related metadata
      localStorage.removeItem("user_id");
    }
  },
};
