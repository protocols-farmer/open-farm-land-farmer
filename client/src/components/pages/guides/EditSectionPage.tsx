//src/components/pages/guides/CreateStepPage.tsx
"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUpdateGuideSectionMutation } from "@/lib/features/guideSection/guideSectionApiSlice";
import { useGetPostByIdQuery } from "@/lib/features/post/postApiSlice";
import GuideSectionForm from "./GuideSectionForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Edit3 } from "lucide-react";

interface EditSectionPageProps {
  postId: string;
  stepId: string;
  sectionId: string;
}

export default function EditSectionPage({
  postId,
  stepId,
  sectionId,
}: EditSectionPageProps) {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId);
  const [updateSection, { isLoading: isSubmitting }] =
    useUpdateGuideSectionMutation();

  const sectionData = useMemo(() => {
    if (!post) return null;
    const step = post.steps?.find((s) => s.id === stepId);
    return step?.sections?.find((sec) => sec.id === sectionId);
  }, [post, stepId, sectionId]);

  const handleFormSubmit = async (formData: FormData) => {
    const promise = updateSection({ sectionId, postId, formData }).unwrap();

    try {
      await toast.promise(promise, {
        loading: "Refining segment data...",
        success: "Segment updated in the ledger.",
        error: "Failed to update segment.",
      });
      router.push(`/guides/${postId}`);
    } catch (err) {
      // Error handled by toast.promise
    }
  };

  if (isLoadingPost) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="animate-pulse text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          Fetching Segment Data...
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 space-y-8 px-4">
      <header className="space-y-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="rounded-none font-bold border-3 border-double h-9 px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Discard Changes
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 border-3 border-double border-primary flex items-center justify-center bg-primary/5">
            <Edit3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">
              Refine Segment
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">
              Currently editing segment in: {post?.title}
            </p>
          </div>
        </div>
      </header>

      <Card className="rounded-none border-3 border-double bg-card">
        <CardHeader className="border-b-3 border-double pb-6">
          <CardTitle className="text-xl font-black">
            Segment Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <GuideSectionForm
            mode="edit"
            initialData={sectionData}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
