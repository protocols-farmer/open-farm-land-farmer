// src/components/layouts/NextAuthSync.tsx
"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import {
  setCredentials,
  clearCredentials,
} from "@/lib/features/auth/authSlice";
import { setCurrentUser } from "@/lib/features/user/userSlice";
import { SanitizedUserDto } from "@/lib/features/user/userTypes";

export function NextAuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/login?error=SessionExpired" });
      return;
    }

    if (status === "authenticated" && session) {
      // 1. Sync the Token
      dispatch(setCredentials({ token: session.backendAccessToken ?? null }));

      // 2. Sync User Data
      if (session.user) {
        /**
         * FIX: Do NOT create a new object with 'null' values.
         * Cast the session.user directly to your DTO.
         * Since we updated authOptions.tsx, session.user now contains
         * everything (bio, location, etc.).
         */
        dispatch(setCurrentUser(session.user as SanitizedUserDto));
      }
    } else if (status === "unauthenticated") {
      dispatch(clearCredentials());
      dispatch(setCurrentUser(null));
    }
  }, [session, status, dispatch]);

  return null;
}
