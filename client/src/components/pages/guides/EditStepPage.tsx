//src/components/pages/guides/EditStepPage.tsx
"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUpdateGuideStepMutation } from "@/lib/features/guideSection/guideStepApiSlice";
import { useGetPostByIdQuery } from "@/lib/features/post/postApiSlice";
import GuideStepForm from "./GuideStepForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Settings2 } from "lucide-react";

interface EditStepPageProps {
  postId: string;
  stepId: string;
}

export default function EditStepPage({ postId, stepId }: EditStepPageProps) {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId);
  const [updateStep, { isLoading: isSubmitting }] =
    useUpdateGuideStepMutation();

  const stepData = useMemo(() => {
    return post?.steps?.find((s) => s.id === stepId);
  }, [post, stepId]);

  const handleFormSubmit = async (data: any) => {
    try {
      await toast.promise(updateStep({ stepId, postId, data }).unwrap(), {
        loading: "Updating step module...",
        success: "Changes synchronized to the ledger.",
        error: "Failed to update step.",
      });

      // Redirect back to the guide and maintain focus on the edited step
      router.push(`/guides/${postId}?activeStepId=${stepId}`);
    } catch (err) {
      // Error handled by toast.promise
    }
  };

  if (isLoadingPost) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="animate-pulse text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          Fetching Module Data...
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-8 px-4">
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
            <Settings2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
              Refine Module
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Currently Editing: {stepData?.title || "Step Module"}
            </p>
          </div>
        </div>
      </header>

      <Card className="rounded-none border-3 border-double bg-card">
        <CardHeader className="border-b-3 border-double pb-6">
          <CardTitle className="text-xl font-black">
            Module Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <GuideStepForm
            mode="edit"
            initialData={stepData}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
