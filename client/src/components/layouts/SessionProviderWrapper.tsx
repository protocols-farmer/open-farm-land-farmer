// src/components/SessionProviderWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      refetchOnWindowFocus={false} // <--- CRITICAL: Prevents data wipe on tab switch
    >
      {children}
    </SessionProvider>
  );
}
