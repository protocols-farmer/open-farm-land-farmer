// src/app/(app)/admin/layout.tsx
import { getServerSession } from "next-auth";
import { SystemRole } from "@/lib/features/user/userTypes";
import AdminSidebar from "@/components/pages/admin/layouts/AdminSidebar";
import { authOptions } from "@/lib/authOptions";
import AccessDenied from "@/components/shared/AccessDenied";
import AuthRequiredCard from "@/components/shared/AuthRequiredCard"; // Reusing your existing one

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 1. Check if session exists (Are they even logged in?)
  if (!session || !session.user) {
    return (
      <AuthRequiredCard
        title="Admin Login Required"
        description="Please sign in with an administrator account."
      />
    );
  }

  // 2. Check Role
  const isAuthorized =
    session.user.systemRole === SystemRole.SUPER_ADMIN ||
    session.user.systemRole === SystemRole.DEVELOPER;
  if (!session || !session.user) {
    return (
      <AuthRequiredCard
        title="Admin Login Required"
        description="Please sign in with an administrator account."
      />
    );
  }

  if (!isAuthorized) {
    return <AccessDenied />;
  }
  // 3. Authorized
  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar userRole={session.user.systemRole as SystemRole} />
      <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
