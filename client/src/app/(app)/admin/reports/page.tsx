//src/app/(app)/admin/reports/page.tsx
import ReportManagement from "@/components/pages/admin/reports/ReportManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vulnerability Triage | Admin Panel",
};

export default function AdminReportsPage() {
  return <ReportManagement />;
}
