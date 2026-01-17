//src/app/(app)/projects/[slug]/page.tsx
import ProjectsDetails from "@/components/pages/projects/ProjectsDetails";

async function ProjectsDetailsPage(
  // Accepting params to get the slug for the project details
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await params;

  return (
    <div>
      <ProjectsDetails postId={slug} />
    </div>
  );
}
export default ProjectsDetailsPage;
