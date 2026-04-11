//src/components/pages/guides/CreateStepPage.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAddGuideStepMutation } from "@/lib/features/guideSection/guideStepApiSlice";
import { useGetPostByIdQuery } from "@/lib/features/post/postApiSlice";
import GuideStepForm from "./GuideStepForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, CircleChevronLeft, Loader2, Sprout } from "lucide-react";

interface CreateStepPageProps {
  postId: string;
}

export default function CreateStepPage({ postId }: CreateStepPageProps) {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId);
  const [addStep, { isLoading: isSubmitting }] = useAddGuideStepMutation();

  const totalSteps = post?.steps?.length || 0;

  const handleFormSubmit = async (data: any) => {
    const promise = addStep({ postId, data }).unwrap();

    try {
      await toast.promise(promise, {
        loading: "Planting new step module...",
        success: "Step synchronized to the plot.",
        error: "Failed to synchronize step.",
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
          Loading Plot Data...
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
          <CircleChevronLeft className="h-4 w-4" />
          Return to Guide
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 border-3 border-double border-primary flex items-center justify-center bg-primary/5">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black  ">Append Module</h1>
            <p className="text-xs font-bold text-muted-foreground  ">
              Adding to: {post?.title}
            </p>
          </div>
        </div>
      </header>

      <Card className="rounded-none border-3 border-double bg-card">
        <CardHeader className="border-b-3 border-double pb-6">
          <CardTitle className="text-xl font-black">
            Module Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <GuideStepForm
            mode="create"
            initialData={{ order: totalSteps + 1 }}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
