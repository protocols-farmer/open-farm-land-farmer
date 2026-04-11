//src/app/(app)/guides/[slug]/steps/[stepId]/edit/page.tsx
import EditStepPage from "@/components/pages/guides/EditStepPage";

async function Page({
  params,
}: {
  params: Promise<{ slug: string; stepId: string }>;
}) {
  const { slug, stepId } = await params;

  return (
    <div className="min-h-screen bg-background">
      <EditStepPage postId={slug} stepId={stepId} />
    </div>
  );
}

export default Page;
