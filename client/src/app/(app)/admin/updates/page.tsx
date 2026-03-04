//src/app/(app)/admin/updates/page.tsx
import UpdateManagement from "@/components/pages/admin/updates/UpdateManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin: Update Management",
  description: "Manage platform change logs, versions, and security updates.",
};

export default function AdminUpdatesPage() {
  return <UpdateManagement />;
}
