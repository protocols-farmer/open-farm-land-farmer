// FILE: src/components/pages/guides/GuideDetails.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import toast from "react-hot-toast";

import PostInteractionHub from "../../shared/PostInteractionHub";
import GuideStepItem from "./GuideStepItem";
import GuideStepForm from "./GuideStepForm";
import GuideSectionForm from "./GuideSectionForm";
import CommentSection from "../posts/CommentSection";

import {
  GuideStepDto,
  GuideSectionDto,
} from "@/lib/features/guideSection/guideTypes";
import {
  useAddGuideStepMutation,
  useUpdateGuideStepMutation,
  useDeleteGuideStepMutation,
} from "@/lib/features/guideSection/guideStepApiSlice";
import {
  useAddGuideSectionMutation,
  useUpdateGuideSectionMutation,
  useDeleteGuideSectionMutation,
} from "@/lib/features/guideSection/guideSectionApiSlice";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  PlusCircle,
  FileText,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import DOMPurify from "dompurify";

export default function GuideDetails({ postId }: { postId: string }) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, { skip: !postId });
  const currentUser = useAppSelector(selectCurrentUser);

  const [recordPostView] = useRecordPostViewMutation();
  const [mainImage, setMainImage] = useState<string | undefined>();

  // --- FIX: Re-introducing state to manage the currently visible step ---
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // --- DIALOG AND FORM STATE ---
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<GuideStepDto | null>(null);
  const [editingSection, setEditingSection] = useState<GuideSectionDto | null>(
    null
  );
  const [parentStepId, setParentStepId] = useState<string | null>(null);

  // --- RTK QUERY MUTATION HOOKS ---
  const [addGuideStep, { isLoading: isAddingStep }] = useAddGuideStepMutation();
  const [updateGuideStep, { isLoading: isUpdatingStep }] =
    useUpdateGuideStepMutation();
  const [deleteGuideStep] = useDeleteGuideStepMutation();
  const [addGuideSection, { isLoading: isAddingSection }] =
    useAddGuideSectionMutation();
  const [updateGuideSection, { isLoading: isUpdatingSection }] =
    useUpdateGuideSectionMutation();
  const [deleteGuideSection] = useDeleteGuideSectionMutation();

  // --- EFFECTS ---
  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  useEffect(() => {
    if (post?.images && post.images.length > 0)
      setMainImage(post.images[0].url);
    if (post?.content) setSanitizedContent(DOMPurify.sanitize(post.content));
  }, [post]);

  if (isLoading) return <p>Loading Guide...</p>;
  if (isError || !post) return <p>Could not load guide.</p>;

  const isAuthor = currentUser?.id === post.authorId;
  const totalSteps = post.steps?.length || 0;

  // --- FIX: Logic to get only the currently active step ---
  const currentStep = post.steps?.[activeStepIndex];

  // --- FIX: Re-introducing navigation handlers ---
  const goToNextStep = () =>
    setActiveStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  const goToPrevStep = () =>
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));

  // --- CRUD HANDLERS (Logic is unchanged, but will now work with the correct UI) ---
  const handleOpenCreateStepDialog = () => {
    setEditingStep(null);
    setIsStepDialogOpen(true);
  };
  const handleOpenEditStepDialog = (step: GuideStepDto) => {
    setEditingStep(step);
    setIsStepDialogOpen(true);
  };
  const handleDeleteStep = (stepId: string) => {
    if (
      window.confirm(
        "Are you sure? Deleting a step will also delete all sections inside it."
      )
    ) {
      toast.promise(deleteGuideStep({ stepId, postId }).unwrap(), {
        loading: "Deleting step...",
        success: "Step deleted!",
        error: "Failed to delete step.",
      });
      // If deleting the last step, go to the previous one
      if (activeStepIndex > 0 && activeStepIndex >= totalSteps - 1) {
        goToPrevStep();
      }
    }
  };
  const handleStepFormSubmit = async (data: any) => {
    const promise = editingStep
      ? updateGuideStep({ stepId: editingStep.id, postId, data }).unwrap()
      : addGuideStep({ postId, data }).unwrap();
    try {
      await toast.promise(promise, {
        loading: "Saving step...",
        success: "Step saved!",
        error: "Failed.",
      });
      setIsStepDialogOpen(false);
    } catch (err) {}
  };
  const handleOpenCreateSectionDialog = (stepId: string) => {
    setEditingSection(null);
    setParentStepId(stepId);
    setIsSectionDialogOpen(true);
  };
  const handleOpenEditSectionDialog = (section: GuideSectionDto) => {
    setEditingSection(section);
    setParentStepId(section.stepId);
    setIsSectionDialogOpen(true);
  };
  const handleDeleteSection = (sectionId: string) => {
    toast.promise(deleteGuideSection({ sectionId, postId }).unwrap(), {
      loading: "Deleting section...",
      success: "Section deleted!",
      error: "Failed.",
    });
  };
  const handleSectionFormSubmit = async (formData: FormData) => {
    const promise = editingSection
      ? updateGuideSection({
          sectionId: editingSection.id,
          postId,
          formData,
        }).unwrap()
      : addGuideSection({ stepId: parentStepId!, postId, formData }).unwrap();
    try {
      await toast.promise(promise, {
        loading: "Saving section...",
        success: "Section saved!",
        error: "Failed.",
      });
      setIsSectionDialogOpen(false);
    } catch (err) {}
  };

  return (
    <section className="mx-auto max-w-7xl py-8 space-y-12">
      {/* --- HEADER SECTION (Unchanged) --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="bg-muted h-full w-full flex items-center justify-center text-muted-foreground">
                No gallery images
              </div>
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setMainImage(img.url)}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                    mainImage === img.url
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${post.title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <header className="space-y-4">
            <Badge variant="secondary" className="w-fit capitalize">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
            <div className="flex items-center gap-4 pt-4 border-t">
              <Link
                href={`/profile/${post.author.username}`}
                className="flex items-center gap-3"
              >
                <Avatar className="h-11 w-11">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback>
                    {post.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground hover:underline">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Published{" "}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            </div>
          </header>
          <PostInteractionHub post={post} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {post.tags.map((postTag) => (
                <Badge key={postTag.tag.id}># {postTag.tag.name}</Badge>
              ))}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.githubLink ? (
              <Button asChild className="w-full">
                <Link href={post.githubLink} target="_blank">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            ) : (
              <div className="text-sm text-center text-muted-foreground p-3 rounded-md border border-dashed flex items-center justify-center">
                No GitHub link
              </div>
            )}
            {post.externalLink ? (
              <Button variant="outline" asChild className="w-full">
                <Link href={post.externalLink} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            ) : (
              <div className="text-sm text-center text-muted-foreground p-3 rounded-md border border-dashed flex items-center justify-center">
                No external link
              </div>
            )}
          </div>{" "}
        </div>
      </div>
      <Separator />

      {/* --- FIX: GUIDE STEPS RENDERED ONE AT A TIME --- */}
      <main className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Guide Steps</h2>
          {isAuthor && (
            <Button
              onClick={handleOpenCreateStepDialog}
              size="sm"
              variant="outline"
              className="mt-4"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Step
            </Button>
          )}
        </div>

        {currentStep ? (
          // Render only the currently active step
          <GuideStepItem
            key={currentStep.id}
            step={currentStep}
            index={activeStepIndex}
            isAuthor={isAuthor}
            onEditStep={() => handleOpenEditStepDialog(currentStep)}
            onDeleteStep={() => handleDeleteStep(currentStep.id)}
            onAddSection={() => handleOpenCreateSectionDialog(currentStep.id)}
            onEditSection={handleOpenEditSectionDialog}
            onDeleteSection={handleDeleteSection}
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center min-h-[30vh]">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-6 text-xl font-semibold tracking-tight">
              This Guide Has No Steps Yet
            </h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              {isAuthor
                ? "Click 'Add New Step' to begin building your guide."
                : "Check back later for content!"}
            </p>
          </div>
        )}

        {/* --- FIX: Re-introduced the Next/Previous Step buttons --- */}
        {totalSteps > 1 && (
          <div className="flex justify-between items-center border-t pt-6">
            <Button
              variant="outline"
              onClick={goToPrevStep}
              disabled={activeStepIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous Step
            </Button>
            <div className="text-sm font-medium text-muted-foreground">
              Step {activeStepIndex + 1} of {totalSteps}
            </div>
            <Button
              onClick={goToNextStep}
              disabled={activeStepIndex === totalSteps - 1}
            >
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
      <Separator />

      <div className="mx-auto max-w-4xl">
        <div
          className="prose prose-lg dark:prose-invert max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <Separator />
      <div id="comments">
        <Card>
          <CardHeader>
            <CardTitle>Comments ({post.commentsCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentSection
              postId={post.id}
              totalComments={post.commentsCount}
            />
          </CardContent>
        </Card>
      </div>

      {/* --- DIALOGS (Unchanged) --- */}
      <Dialog open={isStepDialogOpen} onOpenChange={setIsStepDialogOpen}>
        <DialogContent className="sm:max-w-2xl grid grid-rows-[auto_1fr] max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle>{editingStep ? "Edit" : "Add"} Step</DialogTitle>
            <DialogDescription>
              Steps are the main "chapters" of your guide.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto p-6">
            <GuideStepForm
              mode={editingStep ? "edit" : "create"}
              initialData={
                editingStep
                  ? {
                      title: editingStep.title,
                      description: editingStep.description ?? undefined,
                      order: editingStep.order,
                    }
                  : { order: totalSteps + 1, title: "", description: "" }
              }
              onSubmit={handleStepFormSubmit}
              isSubmitting={isAddingStep || isUpdatingStep}
              onCancel={() => setIsStepDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent className="sm:max-w-3xl grid grid-rows-[auto_1fr] max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle>{editingSection ? "Edit" : "Add"} Section</DialogTitle>
            <DialogDescription>
              Sections are the content blocks within a step.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto p-6">
            <GuideSectionForm
              mode={editingSection ? "edit" : "create"}
              initialData={
                editingSection
                  ? {
                      title: editingSection.title ?? "",
                      content: editingSection.content,
                      order: editingSection.order,
                      videoUrl: editingSection.videoUrl ?? "",
                    }
                  : {
                      order:
                        (post.steps.find((s) => s.id === parentStepId)?.sections
                          .length || 0) + 1,
                      title: "",
                      content: "",
                      videoUrl: "",
                    }
              }
              onSubmit={handleSectionFormSubmit}
              isSubmitting={isAddingSection || isUpdatingSection}
              onCancel={() => setIsSectionDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
