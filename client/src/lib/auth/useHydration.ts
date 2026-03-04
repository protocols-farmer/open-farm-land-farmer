//src/lib/auth/useHydration.ts

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
      const token = authStorage.getToken();

      if (token) {
        dispatch(setCredentials({ token }));
      }

      setIsHydrated(true);
    };

    hydrate();
  }, [dispatch]);

  return isHydrated;
};
