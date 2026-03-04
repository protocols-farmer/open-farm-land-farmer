//src/app/(app)/admin/settings/page.tsx
import AdminSettingsPage from "@/components/pages/admin/settings/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin: System Settings",
};
function page() {
  return <AdminSettingsPage />;
}
export default page;
