//src/components/pages/lessons/GuideDetails.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react"; // Added useMemo
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import "highlight.js/styles/github-dark.css"; // CRITICAL: Added for syntax highlighting

// --- HOOKS & STATE MANAGEMENT ---
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- GUIDE SPECIFIC LOGIC ---
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

// --- UI COMPONENTS ---
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
  Terminal,
} from "lucide-react";

export default function GuideDetails({ postId }: { postId: string }) {
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, { skip: !postId });

  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();

  /**
   * FIX 1: DERIVED IMAGE STATE
   * We calculate the mainImage instantly from render.
   */
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const mainImage = selectedImage || post?.images?.[0]?.url;

  /**
   * FIX 2: MEMOIZED SANITIZATION
   * Prevents cascading renders and preserves highlight.js classes.
   */
  const sanitizedContent = useMemo(() => {
    const content = post?.content;
    if (!content) return "";
    return DOMPurify.sanitize(content, {
      ADD_ATTR: ["class"],
    });
  }, [post?.content]);

  // --- LOCAL UI STATE ---
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<GuideStepDto | null>(null);
  const [editingSection, setEditingSection] = useState<GuideSectionDto | null>(
    null,
  );
  const [parentStepId, setParentStepId] = useState<string | null>(null);

  // --- MUTATIONS ---
  const [addGuideStep, { isLoading: isAddingStep }] = useAddGuideStepMutation();
  const [updateGuideStep, { isLoading: isUpdatingStep }] =
    useUpdateGuideStepMutation();
  const [deleteGuideStep] = useDeleteGuideStepMutation();
  const [addGuideSection, { isLoading: isAddingSection }] =
    useAddGuideSectionMutation();
  const [updateGuideSection, { isLoading: isUpdatingSection }] =
    useUpdateGuideSectionMutation();
  const [deleteGuideSection] = useDeleteGuideSectionMutation();

  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  if (isLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="animate-pulse text-muted-foreground">
          Preparing your guide...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto border-destructive/50">
          <CardContent className="pt-6 text-center space-y-4">
            <Terminal className="h-10 w-10 mx-auto text-destructive" />
            <h2 className="text-xl font-bold uppercase tracking-tighter">
              Guide Missing
            </h2>
            <p className="text-muted-foreground text-sm">
              This guide has returned to the soil.
            </p>
            <Button variant="outline" asChild>
              <Link href="/guides">Back to Guides</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  const isAuthor = currentUser?.id === post.authorId;
  const totalSteps = post.steps?.length || 0;
  const currentStep = post.steps?.[activeStepIndex];

  // --- HANDLERS ---
  const goToNextStep = () =>
    setActiveStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  const goToPrevStep = () =>
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));

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
        "Are you sure? Deleting a step will also delete all sections inside it.",
      )
    ) {
      toast.promise(deleteGuideStep({ stepId, postId }).unwrap(), {
        loading: "Deleting step...",
        success: "Step deleted!",
        error: "Failed to delete step.",
      });
      if (activeStepIndex > 0 && activeStepIndex >= totalSteps - 1)
        goToPrevStep();
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
    <section className="mx-auto max-w-7xl py-8 space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* --- Image Gallery (Derived Logic) --- */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-muted shadow-sm">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                No gallery images
              </div>
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                    mainImage === img.url
                      ? "border-primary shadow-md"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- Header & Meta --- */}
        <div className="flex flex-col space-y-6">
          <header className="space-y-4">
            <Badge variant="secondary" className="w-fit capitalize font-bold">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-black uppercase tracking-tighter md:text-5xl leading-none break-all">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
            <div className="flex items-center gap-4 pt-6 border-t">
              <Link
                href={`/profile/${post.author.username}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="h-12 w-12 border shadow-sm">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback className="font-bold">
                    {post.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground group-hover:underline decoration-primary">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
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
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {post.tags.map((postTag) => (
                <Badge
                  key={postTag.tag.id}
                  variant="outline"
                  className="bg-background"
                >
                  # {postTag.tag.name}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            {post.githubLink && (
              <Button asChild className="font-bold">
                <a href={post.githubLink} target="_blank" rel="noopener">
                  <Github className="mr-2 h-4 w-4" /> Repo
                </a>
              </Button>
            )}
            {post.externalLink && (
              <Button variant="outline" asChild className="font-bold">
                <a href={post.externalLink} target="_blank" rel="noopener">
                  <ExternalLink className="mr-2 h-4 w-4" /> Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Separator />

      {/* --- Memoized Main Content --- */}
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="prose prose-lg prose-neutral prose-quoteless dark:prose-invert max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <Separator />

      {/* --- Guide Steps Navigator --- */}
      <main className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Guide Steps
          </h2>
          {isAuthor && (
            <Button
              onClick={handleOpenCreateStepDialog}
              size="sm"
              variant="outline"
              className="font-bold"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Step
            </Button>
          )}
        </div>

        {currentStep ? (
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
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center min-h-[30vh]">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-6 text-xl font-black uppercase tracking-tighter">
              This Guide Has No Steps Yet
            </h3>
            <p className="mt-2 text-muted-foreground">
              {isAuthor
                ? "Click 'Add New Step' to begin building your guide."
                : "Check back later for content!"}
            </p>
          </div>
        )}

        {totalSteps > 1 && (
          <div className="flex justify-between items-center border-t pt-6 bg-muted/20 p-4 rounded-xl">
            <Button
              variant="ghost"
              onClick={goToPrevStep}
              disabled={activeStepIndex === 0}
              className="font-bold"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Progress: {activeStepIndex + 1} / {totalSteps}
            </div>
            <Button
              onClick={goToNextStep}
              disabled={activeStepIndex === totalSteps - 1}
              className="font-bold"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      <Separator />

      <div id="comments" className="max-w-4xl mx-auto w-full">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter">
              Discussions ({post.commentsCount})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <CommentSection
              postId={post.id}
              totalComments={post.commentsCount}
            />
          </CardContent>
        </Card>
      </div>

      {/* --- Dialogs (Remained largely unchanged, but kept for context) --- */}
      <Dialog open={isStepDialogOpen} onOpenChange={setIsStepDialogOpen}>
        <DialogContent className="sm:max-w-2xl grid grid-rows-[auto_1fr] max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="font-black uppercase tracking-tighter text-2xl">
              {editingStep ? "Edit" : "Add"} Step
            </DialogTitle>
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
            <DialogTitle className="font-black uppercase tracking-tighter text-2xl">
              {editingSection ? "Edit" : "Add"} Section
            </DialogTitle>
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
