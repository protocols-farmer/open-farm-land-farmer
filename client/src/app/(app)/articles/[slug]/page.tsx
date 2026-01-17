//stc/app/(app)/articles/[slug]/page.tsx

import ArticleDetails from "@/components/pages/articles/ArticleDetails";

export default async function ArticlesDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <ArticleDetails postId={slug} />
    </div>
  );
}
