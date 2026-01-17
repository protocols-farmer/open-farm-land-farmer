import DiscussionDetails from "@/components/pages/discussions/DiscussionDetails";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div>
      <DiscussionDetails postId={slug} />
    </div>
  );
}
export default page;
