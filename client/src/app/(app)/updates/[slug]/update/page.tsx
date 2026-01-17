// src/app/updates/[id]/update/page.tsx
import EditUpdatePage from "@/components/pages/updates/EditUpdate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Update",
};

export default async function EditUpdate({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <EditUpdatePage updateId={slug} />;
}
