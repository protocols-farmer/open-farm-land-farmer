//src/components/pages/guides/CreateStepPage.tsx
"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAddGuideSectionMutation } from "@/lib/features/guideSection/guideSectionApiSlice";
import { useGetPostByIdQuery } from "@/lib/features/post/postApiSlice";
import GuideSectionForm from "./GuideSectionForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Layers, CircleChevronLeft } from "lucide-react";

interface CreateSectionPageProps {
  postId: string;
  stepId: string;
}

export default function CreateSectionPage({
  postId,
  stepId,
}: CreateSectionPageProps) {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId);
  const [addSection, { isLoading: isSubmitting }] =
    useAddGuideSectionMutation();

  const stepData = useMemo(() => {
    return post?.steps?.find((s) => s.id === stepId);
  }, [post, stepId]);

  const nextOrder = (stepData?.sections?.length || 0) + 1;

  const handleFormSubmit = async (formData: FormData) => {
    const promise = addSection({ stepId, postId, formData }).unwrap();

    try {
      await toast.promise(promise, {
        loading: "Appending technical segment...",
        success: "Segment synchronized to the module.",
        error: "Failed to synchronize segment.",
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
        <p className="animate-pulse text-[10px] font-black text-muted-foreground  ">
          Syncing Plot Data...
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
          <CircleChevronLeft className="h-4 w-4" />
          Return to Guide
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 border-3 border-double border-primary flex items-center justify-center bg-primary/5">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black   leading-none">
              Append Segment
            </h1>
            <p className="text-xs font-bold text-muted-foreground   mt-1">
              Module: {stepData?.title}
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
            mode="create"
            initialData={{ order: nextOrder }}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
