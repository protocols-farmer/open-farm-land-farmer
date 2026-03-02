//src/app/(app)/admin/layout.tsx
"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { selectIsHydrated } from "@/lib/features/auth/authSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import AdminSidebar from "@/components/pages/admin/layouts/AdminSidebar";
import AccessDenied from "@/components/shared/AccessDenied";
import AuthRequiredCard from "@/components/shared/AuthRequiredCard";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsHydrated);

  // 1. WHILE HYDRATING
  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. LOGGED OUT: Show Centered Auth Card
  if (!currentUser) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <AuthRequiredCard
            title="Admin Login Required"
            description="Please sign in with an administrator account to enter the Administration Guild."
          />
        </div>
      </div>
    );
  }

  // 3. WRONG ROLE: Show Centered Access Denied
  const isAuthorized =
    currentUser.systemRole === SystemRole.SUPER_ADMIN ||
    currentUser.systemRole === SystemRole.DEVELOPER;

  if (!isAuthorized) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <AccessDenied />
        </div>
      </div>
    );
  }

  // 4. AUTHORIZED: Show Admin UI
  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar userRole={currentUser.systemRole as SystemRole} />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
