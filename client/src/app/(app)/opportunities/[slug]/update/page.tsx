// src/app/opportunities/[id]/edit/page.tsx
import EditOpportunityPage from "@/components/pages/opportunities/EditOpportunity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Opportunity",
};

export default async function EditOpportunity({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <EditOpportunityPage opportunityId={slug} />;
}
