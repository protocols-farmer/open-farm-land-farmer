// src/app/opportunities/[id]/page.tsx
import OpportunityDetailsPage from "@/components/pages/opportunities/OpportunityDetails";

// Metadata can be generated dynamically here if needed
export const metadata = {
  title: "Opportunity Details",
};

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <OpportunityDetailsPage opportunityId={slug} />;
}
