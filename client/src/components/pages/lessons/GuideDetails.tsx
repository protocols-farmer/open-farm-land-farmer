//src/components/pages/lessons/GuideDetails.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import "highlight.js/styles/github-dark.css";

import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
  useDeletePostMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

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
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLink,
  Github,
  PlusCircle,
  FileText,
  ArrowLeft,
  ArrowRight,
  Terminal,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

export default function GuideDetails({ postId }: { postId: string }) {
  const router = useRouter();
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, { skip: !postId });

  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const mainImage = selectedImage || post?.images?.[0]?.url;

  const sanitizedContent = useMemo(() => {
    const content = post?.content;
    if (!content) return "";
    return DOMPurify.sanitize(content, {
      ADD_ATTR: ["class"],
    });
  }, [post?.content]);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<GuideStepDto | null>(null);
  const [editingSection, setEditingSection] = useState<GuideSectionDto | null>(
    null,
  );
  const [parentStepId, setParentStepId] = useState<string | null>(null);

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
        <p className="animate-pulse text-muted-foreground font-medium">
          Preparing guide content...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto border-destructive/20 shadow-none bg-destructive/5">
          <CardContent className="pt-6 text-center space-y-4">
            <Terminal className="h-10 w-10 mx-auto text-destructive/50" />
            <h2 className="text-xl font-black ">Guide not found</h2>
            <p className="text-muted-foreground text-sm font-medium">
              The requested guide is unavailable or has been removed from the
              system.
            </p>
            <Button variant="outline" asChild className="">
              <Link href="/guides">Back to guides</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  const isAuthor = currentUser?.id === post.authorId;
  const totalSteps = post.steps?.length || 0;
  const currentStep = post.steps?.[activeStepIndex];

  const handleDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      toast.success("Guide deleted successfully.");
      router.push("/guides");
    } catch {
      toast.error("Failed to delete the guide.");
    }
  };

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
        "Deleting a step will also remove all associated sections. Proceed?",
      )
    ) {
      toast.promise(deleteGuideStep({ stepId, postId }).unwrap(), {
        loading: "Deleting step...",
        success: "Step removed.",
        error: "Action failed.",
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
        success: "Step updated.",
        error: "Save failed.",
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
      success: "Section removed.",
      error: "Action failed.",
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
        success: "Section updated.",
        error: "Save failed.",
      });
      setIsSectionDialogOpen(false);
    } catch (err) {}
  };

  return (
    <section className="mx-auto max-w-7xl py-8 space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* --- Image Gallery --- */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden  border bg-muted shadow-sm">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground font-medium text-sm">
                No preview images available
              </div>
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square w-full overflow-hidden  border-2 transition-all ${
                    mainImage === img.url
                      ? "border-primary"
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
            <Badge variant="secondary" className="w-fit font-bold">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-black  md:text-5xl leading-none">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              {post.description}
            </p>

            {isAuthor && (
              <div className="flex items-center gap-2 pt-2">
                <Button asChild variant="outline" className="flex-1 font-bold ">
                  <Link href={`/posts/${post.id}/update`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit guide
                  </Link>
                </Button>

                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="">
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive font-bold cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialogContent className=" border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black ">
                        Confirm deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground font-medium">
                        This action will permanently remove the guide and all
                        associated steps. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="pt-4">
                      <AlertDialogCancel className=" font-bold">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-white hover:bg-destructive/90  font-bold px-8"
                      >
                        {isDeleting ? "Deleting..." : "Confirm delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}

            <div className="flex items-center gap-4 pt-6 border-t">
              <Link
                href={`/profile/${post.author.username}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="h-12 w-12 border shadow-sm">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback className="font-bold">
                    {post.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground group-hover:underline decoration-primary">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-bold  ">
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

          <Card className="bg-muted/30 border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-[10px] font-bold   text-muted-foreground/60">
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {post.tags.map((postTag) => (
                <Badge
                  key={postTag.tag.id}
                  variant="outline"
                  className="bg-background font-bold text-[10px]"
                >
                  # {postTag.tag.name}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {post.githubLink && (
              <Button asChild className="font-bold  h-11">
                <a href={post.githubLink} target="_blank" rel="noopener">
                  <Github className="mr-2 h-4 w-4" /> Source repo
                </a>
              </Button>
            )}
            {post.externalLink && (
              <Button variant="outline" asChild className="font-bold  h-11">
                <a href={post.externalLink} target="_blank" rel="noopener">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="opacity-50" />

      {/* --- Guide Content --- */}
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none break-words font-medium text-muted-foreground/90 prose-headings:font-black prose-headings: prose-headings:text-foreground"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      <Separator className="opacity-50" />

      {/* --- Guide Steps Navigator --- */}
      <main className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black ">Guide steps</h2>
          {isAuthor && (
            <Button
              onClick={handleOpenCreateStepDialog}
              size="sm"
              variant="outline"
              className="font-bold "
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add new step
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
          <div className="flex flex-col items-center justify-center  border-2 border-dashed bg-muted/20 p-16 text-center min-h-[30vh]">
            <FileText className="h-12 w-12 text-muted-foreground/20" />
            <h3 className="mt-6 text-xl font-black ">
              No content published yet
            </h3>
            <p className="mt-2 text-muted-foreground font-medium">
              {isAuthor
                ? "Start building your guide by adding the first step."
                : "The author has not added any steps to this guide yet."}
            </p>
          </div>
        )}

        {totalSteps > 1 && (
          <div className="flex justify-between items-center border bg-muted/10 p-5  shadow-sm">
            <Button
              variant="ghost"
              onClick={goToPrevStep}
              disabled={activeStepIndex === 0}
              className="font-bold hover:bg-muted "
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="text-[10px] font-bold   text-muted-foreground">
              Step {activeStepIndex + 1} of {totalSteps}
            </div>
            <Button
              variant="ghost"
              onClick={goToNextStep}
              disabled={activeStepIndex === totalSteps - 1}
              className="font-bold hover:bg-muted "
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      <Separator className="opacity-50" />

      <div id="comments" className="max-w-4xl mx-auto w-full pb-20">
        <header className="mb-8">
          <h2 className="text-3xl font-black ">
            Discussions ({post.commentsCount})
          </h2>
        </header>
        <CommentSection postId={post.id} totalComments={post.commentsCount} />
      </div>

      {/* Dialogs kept identical but with consistent  classes */}
      <Dialog open={isStepDialogOpen} onOpenChange={setIsStepDialogOpen}>
        <DialogContent className="sm:max-w-2xl grid grid-rows-[auto_1fr] max-h-[90vh] p-0 ">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="font-black  text-2xl">
              {editingStep ? "Edit step" : "Add new step"}
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
        <DialogContent className="sm:max-w-3xl grid grid-rows-[auto_1fr] max-h-[90vh] p-0 ">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="font-black  text-2xl">
              {editingSection ? "Edit section" : "Add new section"}
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
