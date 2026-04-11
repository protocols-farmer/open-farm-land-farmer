//src/app/(app)/guides/[slug]/steps/create/page.tsx
import CreateStepPage from "@/components/pages/guides/CreateStepPage";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      <CreateStepPage postId={slug} />
    </div>
  );
}

export default Page;
