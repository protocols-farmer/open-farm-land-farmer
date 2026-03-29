//src/app/(app)/admin/appeals/page.tsx
import AppealManagement from "@/components/pages/admin/appeals/AppealManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin: Appeal Management",
  description: "Review and process user account appeals.",
};

export default function AdminAppealsPage() {
  return <AppealManagement />;
}
