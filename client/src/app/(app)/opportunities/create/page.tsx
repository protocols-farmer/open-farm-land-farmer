// src/app/opportunities/create/page.tsx
import CreateOpportunityPage from "@/components/pages/opportunities/CreateOpportunity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Opportunity",
};

export default function CreateOpportunity() {
  return <CreateOpportunityPage />;
}
