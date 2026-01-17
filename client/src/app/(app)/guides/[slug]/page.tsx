import GuideDetails from "@/components/pages/lessons/GuideDetails";

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
