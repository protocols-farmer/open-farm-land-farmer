//src/app/(app)/admin/opportunities/page.tsx
import OpportunityManagement from "@/components/pages/admin/opportunities/OpportunityManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin: Opportunity Management",
  description: "Moderate and manage platform job listings and opportunities.",
};

export default function AdminOpportunitiesPage() {
  return <OpportunityManagement />;
}
