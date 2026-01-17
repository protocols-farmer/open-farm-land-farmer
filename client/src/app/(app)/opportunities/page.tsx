// src/app/opportunities/page.tsx
import AllOpportunitiesPage from "@/components/pages/opportunities/AllOpportunities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Opportunities",
  description:
    "Find your next career opportunity with us. We are hiring for various roles.",
};

export default function OpportunitiesPage() {
  return <AllOpportunitiesPage />;
}
