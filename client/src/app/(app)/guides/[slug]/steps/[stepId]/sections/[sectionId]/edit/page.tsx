//src/app/(app)/guides/[slug]/steps/[stepId]/sections/[sectionId]/edit/page.tsx
import EditSectionPage from "@/components/pages/guides/EditSectionPage";

async function Page({
  params,
}: {
  params: Promise<{ slug: string; stepId: string; sectionId: string }>;
}) {
  const { slug, stepId, sectionId } = await params;

  return (
    <div className="min-h-screen bg-background">
      <EditSectionPage postId={slug} stepId={stepId} sectionId={sectionId} />
    </div>
  );
}

export default Page;
