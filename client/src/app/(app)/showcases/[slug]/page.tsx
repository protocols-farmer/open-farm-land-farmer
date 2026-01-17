import ShowcaseDetails from "@/components/pages/showcases/ShowcaseDetails";

async function ShowcaseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <ShowcaseDetails postId={slug} />
    </div>
  );
}
export default ShowcaseDetailsPage;
