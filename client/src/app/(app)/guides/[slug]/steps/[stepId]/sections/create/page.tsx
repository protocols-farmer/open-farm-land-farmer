//src/app/(app)/guides/[slug]/steps/[stepId]/edit/page.tsx
import CreateSectionPage from "@/components/pages/guides/CreateSectionPage";

async function Page({
  params,
}: {
  params: Promise<{ slug: string; stepId: string }>;
}) {
  const { slug, stepId } = await params;

  return (
    <div className="min-h-screen bg-background">
      <CreateSectionPage postId={slug} stepId={stepId} />
    </div>
  );
}

export default Page;
