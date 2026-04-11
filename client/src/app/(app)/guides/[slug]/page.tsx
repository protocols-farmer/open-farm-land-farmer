//src/app/(app)/guides/[slug]/page.tsx
import GuideDetails from "@/components/pages/guides/GuideDetails";

async function GuideDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <GuideDetails postId={slug} />
    </div>
  );
}
export default GuideDetailsPage;
