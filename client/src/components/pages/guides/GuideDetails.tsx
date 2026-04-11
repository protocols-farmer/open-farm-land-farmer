//src/components/pages/guides/GuideDetails.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import "highlight.js/styles/github-dark.css";

// API & State
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
  useDeletePostMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// Components
import GuideSidebar from "./GuideSidebar";
import GuideContentStage from "./GuideContentStage";
import GuideNavigation from "./GuideNavigation";
import GuideMobileCurriculum from "./GuideMobileSidebar";
import GuideStepItem from "./GuideStepItem";
import GuideStepForm from "./GuideStepForm";
import GuideSectionForm from "./GuideSectionForm";
import CommentSection from "../posts/CommentSection";
import GuideInteractionHub from "./GuideInteractionHub";

// Mutations
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

// UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Menu,
  BookOpen,
  Edit3,
  Trash2,
  Settings2,
  TriangleAlert,
  Github,
  Link2,
  CircleChevronLeft,
  Loader2,
  Terminal,
  Link2Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import TiptapRenderer from "../posts/TiptapRenderer";
import { FlourishOrnate } from "@/components/shared/Ornates";

const FALLBACK_IMAGE = "/fallback-project.jpg";

export default function GuideDetails({ postId }: { postId: string }) {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, { skip: !postId });

  const [recordPostView] = useRecordPostViewMutation();
  const [deletePost] = useDeletePostMutation();

  const [addGuideStep, { isLoading: isAddingStep }] = useAddGuideStepMutation();
  const [updateGuideStep, { isLoading: isUpdatingStep }] =
    useUpdateGuideStepMutation();
  const [deleteGuideStep] = useDeleteGuideStepMutation();

  const [addGuideSection, { isLoading: isAddingSection }] =
    useAddGuideSectionMutation();
  const [updateGuideSection, { isLoading: isUpdatingSection }] =
    useUpdateGuideSectionMutation();
  const [deleteGuideSection] = useDeleteGuideSectionMutation();

  const [activeStepId, setActiveStepId] = useState<string>("overview");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<any>(null);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [parentStepId, setParentStepId] = useState<string | null>(null);

  // Gallery & Image State
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [isMainLoading, setIsMainLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const mainImage = selectedImage || post?.images?.[0]?.url;
  const totalSteps = post?.steps?.length || 0;

  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  const isAuthor = currentUser?.id === post?.authorId;

  const currentStep = useMemo(
    () => post?.steps?.find((s) => s.id === activeStepId),
    [post?.steps, activeStepId],
  );

  const currentStepIndex = useMemo(
    () => post?.steps?.findIndex((s) => s.id === activeStepId) ?? -1,
    [post?.steps, activeStepId],
  );

  const handleStepChange = (id: string) => {
    if (id === activeStepId) {
      setIsMobileNavOpen(false);
      return;
    }
    setActiveStepId(id);
    setSelectedImage(undefined);
    setImageError(false);
    setIsMainLoading(true);
    setIsMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleMainDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      toast.success("Guide deleted.");
      router.push("/guides");
    } catch {
      toast.error("Deletion failed.");
    }
  };

  const handleStepFormSubmit = async (data: any) => {
    const promise = editingStep
      ? updateGuideStep({ stepId: editingStep.id, postId, data }).unwrap()
      : addGuideStep({ postId, data }).unwrap();
    try {
      await toast.promise(promise, {
        loading: "Saving step...",
        success: "Step synchronized.",
        error: "Failed to save step.",
      });
      setIsStepDialogOpen(false);
    } catch (err) {}
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
        success: "Section synchronized.",
        error: "Failed to save section.",
      });
      setIsSectionDialogOpen(false);
    } catch (err) {}
  };

  const handleDeleteStep = async (stepId: string) => {
    if (window.confirm("Delete this step and all its sections?")) {
      await deleteGuideStep({ stepId, postId }).unwrap();
      setActiveStepId("overview");
      toast.success("Step removed.");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="animate-pulse text-xs font-bold text-muted-foreground">
          Loading Guide...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto border-3 border-double rounded-none">
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <TriangleAlert className="h-10 w-10 mx-auto text-destructive/50" />
            <h2 className="text-xl font-bold">Guide Not Found</h2>
            <p className="text-sm text-muted-foreground">
              This content may have been moved or archived.
            </p>
            <Button
              variant="outline"
              asChild
              className="rounded-none font-bold border-3 border-double"
            >
              <Link href="/guides">Return to Guides</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  const HeaderActions = isAuthor && activeStepId === "overview" && (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-none border-3 border-double"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-none border-3 border-double"
        >
          <DropdownMenuItem asChild className="font-bold cursor-pointer">
            <Link href={`/posts/${post.id}/update`}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit Details
            </Link>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="font-bold text-destructive focus:text-destructive cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Guide
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent className="rounded-none border-3 border-double">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently erase the guide and all associated
            segments.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="rounded-none font-bold border-3 border-double">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleMainDelete}
            className="rounded-none font-bold bg-destructive text-primary  hover:bg-destructive/90 border-3 border-double"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative max-w-10xl mx-auto">
      <GuideMobileCurriculum
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        post={post}
        activeStepId={activeStepId}
        onStepChange={handleStepChange}
      />

      <aside className="hidden lg:block w-80 border-r-3 border-double border-border bg-card sticky top-0 h-screen">
        <GuideSidebar
          post={post}
          activeStepId={activeStepId}
          onStepChange={handleStepChange}
          isAuthor={isAuthor}
          onAddStep={() => {
            setEditingStep(null);
            setIsStepDialogOpen(true);
          }}
        />
      </aside>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-background border-b-3 border-double flex items-center justify-between p-4 w-full">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-bold truncate max-w-50">
              {activeStepId === "overview" ? "Overview" : currentStep?.title}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto space-y-10">
          {/* Use the Blog-inspired Header logic inside the Stage */}
          <div className="space-y-4">
            <Button
              variant="outline"
              asChild
              className="rounded-none font-bold border-3 border-double h-9 px-4"
            >
              <Link href="/guides" className="flex items-center gap-2">
                <CircleChevronLeft className="h-4 w-4" />
                <span>Return to guides</span>
              </Link>
            </Button>

            <GuideContentStage
              post={post}
              title={
                activeStepId === "overview"
                  ? post.title
                  : currentStep?.title || ""
              }
              isOverview={activeStepId === "overview"}
              actions={HeaderActions}
            >
              {activeStepId === "overview" ? (
                <div className="space-y-10">
                  {post.images && post.images.length > 0 && (
                    <div className="space-y-4">
                      <div className="relative aspect-16/10 h w-full border-3 border-double bg-muted  group ">
                        <FlourishOrnate className="-top-2 -left-2 -rotate-90 z-20" />
                        <FlourishOrnate className="-top-2 -right-2 rotate-0 z-20" />
                        <FlourishOrnate className="-bottom-2 -right-2 rotate-90 z-20" />
                        <FlourishOrnate className="-bottom-2 -left-2 rotate-180 z-20" />

                        {isMainLoading && (
                          <Skeleton className="absolute inset-0 z-10 rounded-none" />
                        )}

                        {mainImage || !imageError ? (
                          <Image
                            key={`${activeStepId}-${mainImage}`}
                            src={
                              imageError
                                ? FALLBACK_IMAGE
                                : mainImage || FALLBACK_IMAGE
                            }
                            alt={post.title}
                            fill
                            className={cn(
                              "object-cover transition-opacity duration-500",
                              isMainLoading ? "opacity-0" : "opacity-100",
                            )}
                            priority
                            onLoad={() => setIsMainLoading(false)}
                            onError={() => {
                              setImageError(true);
                              setIsMainLoading(false);
                            }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-muted-foreground font-black text-[10px] bg-muted/20">
                            No Image Available
                          </div>
                        )}
                      </div>

                      {post.images.length > 1 && (
                        <div className="grid grid-cols-5 gap-3">
                          {post.images.map((img) => {
                            const isSelected = mainImage === img.url;
                            return (
                              <button
                                key={img.id}
                                onClick={() => {
                                  if (!isSelected) {
                                    setIsMainLoading(true);
                                    setSelectedImage(img.url);
                                  }
                                }}
                                className={cn(
                                  "relative aspect-square border-3 border-double transition-all bg-white p-0 overflow-hidden",
                                  isSelected
                                    ? "border-primary opacity-100 scale-95"
                                    : "border-transparent opacity-50 hover:opacity-100",
                                )}
                              >
                                <Image
                                  src={img.url}
                                  alt="thumbnail"
                                  fill
                                  sizes="100px"
                                  className="object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  <TiptapRenderer content={post.content || ""} />
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                  {currentStep && (
                    <GuideStepItem
                      step={currentStep}
                      index={currentStepIndex}
                      isAuthor={isAuthor}
                      onEditStep={() => {
                        setEditingStep(currentStep);
                        setIsStepDialogOpen(true);
                      }}
                      onDeleteStep={() => handleDeleteStep(currentStep.id)}
                      onAddSection={() => {
                        setEditingSection(null);
                        setParentStepId(currentStep.id);
                        setIsSectionDialogOpen(true);
                      }}
                      onEditSection={(section) => {
                        setEditingSection(section);
                        setParentStepId(currentStep.id);
                        setIsSectionDialogOpen(true);
                      }}
                      onDeleteSection={(sectionId) => {
                        toast.promise(
                          deleteGuideSection({ sectionId, postId }).unwrap(),
                          {
                            loading: "Deleting section...",
                            success: "Section removed.",
                            error: "Failed to delete.",
                          },
                        );
                      }}
                    />
                  )}
                </div>
              )}
            </GuideContentStage>
          </div>

          <GuideNavigation
            steps={post.steps}
            activeStepId={activeStepId}
            onNavigate={handleStepChange}
          />

          <Separator className="h-0.5 border-dashed" />

          <div className="space-y-8">
            <GuideInteractionHub post={post} />

            {(post.githubLink || post.externalLink) && (
              <div className="border-3 border-double p-6 bg-card space-y-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  Technical Resources
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.githubLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-none font-bold border-3 border-double"
                    >
                      <a
                        href={post.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" /> Repository
                      </a>
                    </Button>
                  )}
                  {post.externalLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-none font-bold border-3 border-double"
                    >
                      <a
                        href={post.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link2 className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator className="h-0.5 border-dashed" />

          <div id="discussions" className="pb-20 space-y-8">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold">Comments</h2>
              <Badge
                variant="outline"
                className="font-bold rounded-none border-3 border-double"
              >
                {post.commentsCount}
              </Badge>
            </div>
            <CommentSection
              postId={post.id}
              totalComments={post.commentsCount}
            />
          </div>
        </div>
      </main>

      {/* MODALS */}
      {/* Replace the Step Dialog block with this */}
      <Dialog open={isStepDialogOpen} onOpenChange={setIsStepDialogOpen}>
        <DialogContent className="sm:max-w-3xl rounded-none border-3 border-double bg-card p-0 flex flex-col max-h-[90vh]">
          <DialogHeader className="p-6 border-b border-dashed shrink-0">
            <DialogTitle className="font-bold text-3xl">
              {editingStep ? "Edit Step" : "New Step"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 overflow-y-auto flex-1">
            <GuideStepForm
              mode={editingStep ? "edit" : "create"}
              initialData={
                editingStep
                  ? {
                      title: editingStep.title,
                      description: editingStep.description ?? "",
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

      {/* Replace the Section Dialog block with this */}
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent className="sm:max-w-3xl rounded-none border-3 border-double bg-card p-0 flex flex-col max-h-[90vh]">
          <DialogHeader className="p-6 border-b border-dashed shrink-0">
            <DialogTitle className="font-bold text-3xl">
              {editingSection ? "Edit Section" : "Add Section"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 overflow-y-auto flex-1">
            <GuideSectionForm
              mode={editingSection ? "edit" : "create"}
              initialData={
                editingSection
                  ? {
                      title: editingSection.title ?? "",
                      content: editingSection.content,
                      order: editingSection.order,
                      videoUrl: editingSection.videoUrl ?? "",
                      imageUrl: editingSection.imageUrl,
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
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent className="sm:max-w-3xl rounded-none border-3 border-double bg-card p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b border-dashed">
            <DialogTitle className="font-bold text-3xl">
              {editingSection ? "Edit Section" : "Add Section"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <GuideSectionForm
              mode={editingSection ? "edit" : "create"}
              initialData={
                editingSection
                  ? {
                      title: editingSection.title ?? "",
                      content: editingSection.content,
                      order: editingSection.order,
                      videoUrl: editingSection.videoUrl ?? "",
                      imageUrl: editingSection.imageUrl,
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
    </div>
  );
}
