import BlogDetails from "@/components/pages/blogs/BlogDetails";

async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <BlogDetails postId={slug} />
    </div>
  );
}
export default BlogDetailsPage;
