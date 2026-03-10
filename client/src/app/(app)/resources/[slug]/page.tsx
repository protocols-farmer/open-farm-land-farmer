// src/app/(app)/resources/[slug]/page.tsx

import ResourceDetails from "@/components/pages/resources/ResourceDetails";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <ResourceDetails postId={slug} />
    </div>
  );
}
