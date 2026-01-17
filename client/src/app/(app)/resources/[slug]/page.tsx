// src/app/(app)/resources/[slug]/page.tsx

import ResourceDetails from "@/components/pages/resources/ResourceDetails";

// Change the function name to be PascalCase (React convention)
// Change the type of params to expect 'slug'
export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      {/* Pass the correct param to the postId prop */}

      <ResourceDetails postId={slug} />
    </div>
  );
}
