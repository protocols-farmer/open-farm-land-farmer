/**
 * src/lib/auth/useHydration.ts
 * * Custom hook to hydrate the Redux store from LocalStorage on app boot.
 * This prevents the "flash of unauthenticated state" during the initial load.
 */

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { authStorage } from "./authStorage";
import { setCredentials } from "@/lib/features/auth/authSlice";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = async () => {
      // 1. Check if a token exists in the browser
      const token = authStorage.getToken();

      if (token) {
        // 2. If it exists, populate Redux immediately.
        // This allows AuthInitializer to see 'isAuthenticated' as true
        // and trigger the 'getMe' query to fetch the full profile.
        dispatch(setCredentials({ token }));
      }

      // 3. Signal that we are done checking storage
      setIsHydrated(true);
    };

    hydrate();
  }, [dispatch]);

  return isHydrated;
};
