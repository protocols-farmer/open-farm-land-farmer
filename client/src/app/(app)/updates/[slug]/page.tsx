// src/app/updates/[slug]/page.tsx

import UpdateDetails from "@/components/pages/updates/UpdateDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Details",
};

// This is the corrected page component for your [slug] folder
export default async function UpdateDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <UpdateDetails updateId={slug} />
    </div>
  );
}
