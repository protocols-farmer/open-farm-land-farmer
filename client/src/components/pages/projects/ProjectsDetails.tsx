//src/components/pages/projects/ProjectsDetails.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

// --- HOOKS & API ---
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
  useDeletePostMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- MODULAR COMPONENTS ---
import ProjectJourneyTab from "./ProjectJourneyTab";
import ProjectInteractionHub from "./ProjectInteractionHub";
import GitHubPulseCard from "./GitHubPulseCard";
import CommentSection from "../posts/CommentSection";
import TiptapRenderer from "../posts/TiptapRenderer";
import { FlourishOrnate } from "@/components/shared/Ornates";

// --- UI COMPONENTS ---
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  Github,
  ExternalLink,
  Edit,
  Loader2,
  Trash2,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  CircleChevronLeft,
  LayoutGrid,
  History,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectsDetails({ postId }: { postId: string }) {
  const router = useRouter();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const mainImage = selectedImage || post?.images?.[0]?.url;

  const readingTime = useMemo(() => {
    if (!post?.content) return 0;
    const wordsPerMinute = 225;
    const wordCount = post.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post?.content]);

  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletePost(post.id).unwrap();
      toast.success("Project decommissioned successfully.");
      router.push("/projects");
    } catch (err) {
      toast.error("Failed to delete the project.");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="animate-pulse text-[10px] font-black text-muted-foreground  ">
          Syncing Project Data...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Alert
          variant="destructive"
          className="mx-auto max-w-xl rounded-none border-3 border-double"
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-black">Project Not Found</AlertTitle>
          <AlertDescription className="font-medium">
            The requested project journey could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );

  const isAuthor = currentUser?.id === post.author.id;

  return (
    <section className="space-y-13 max-w-10xl mx-auto">
      {/* --- INTRO SECTION --- */}
      <div className="grid grid-cols-1 gap-13 lg:grid-cols-2">
        <div className="flex flex-col space-y-11">
          <header className="space-y-3">
            <Button
              variant="outline"
              asChild
              className="rounded-none font-bold border-3 border-double"
            >
              <Link
                href="/projects"
                className="flex items-center justify-center gap-3 font-bold w-fit"
              >
                <CircleChevronLeft className="h-4 w-4" />
                <span>Return to projects</span>
              </Link>
            </Button>

            <div className="flex items-center gap-3">
              <Badge className="rounded-none font-bold ">{post.category}</Badge>
              <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-[10px]">
                <Clock className="h-3 w-3" />
                {readingTime} Minutes Manifest
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/profile/${post.author.username}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="h-14 w-14 border-3 border-double rounded-none">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback className="font-black text-xl">
                    {post.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-lg group-hover:underline decoration-primary decoration-2 underline-offset-3">
                    {post.author.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-black">
                    Initiated{" "}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            </div>

            <h1 className="text-xl md:text-3xl lg:text-5xl font-black wrap-break-words ">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground font-medium italic border-l-5 pl-4 wrap-break-words">
              {post.description}
            </p>

            {isAuthor && (
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 font-bold rounded-none border-3 border-double"
                >
                  <Link href={`/posts/${post.id}/update`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Project
                  </Link>
                </Button>

                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-none border-3 border-double"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-none border-3 border-double"
                    >
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive font-bold cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialogContent className="rounded-none border-3 border-double">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-black text-2xl">
                        Confirm Decommission
                      </AlertDialogTitle>
                      <AlertDialogDescription className="font-medium">
                        This will permanently remove this project and its
                        journey from the field records.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-none cursor-pointer font-bold border-3 border-double">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-foreground cursor-pointer font-bold hover:bg-destructive/90 border-3 border-double rounded-none"
                      >
                        {isDeleting ? "Deleting..." : "Confirm Deletion"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </header>

          <ProjectInteractionHub post={post} />

          <div className="space-y-3">
            <h3 className="font-bold text-primary flex items-center gap-2 text-xs  ">
              Stack Specification
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((postTag: any) => (
                <Badge
                  key={postTag.tag.id}
                  variant="outline"
                  className="rounded-none text-primary font-bold border-3 border-double"
                >
                  # {postTag.tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.githubLink ? (
              <Button
                asChild
                variant="outline"
                className="rounded-none border-3 border-double"
              >
                <a
                  href={post.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </a>
              </Button>
            ) : (
              <div className="text-[10px] text-center text-muted-foreground p-3 border-3 border-double font-bold ">
                NO_REPO_LINKED
              </div>
            )}
            {post.externalLink ? (
              <Button
                variant="outline"
                asChild
                className="rounded-none border-3 border-double"
              >
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live System
                </a>
              </Button>
            ) : (
              <div className="text-[10px] text-center text-muted-foreground p-3 border-3 border-double font-bold ">
                NO_LIVE_DEMO
              </div>
            )}
          </div>
        </div>

        {/* --- IMAGE SECTION --- */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-3">
          <div className="relative aspect-16/10 w-full border-3 border-double bg-muted group">
            <FlourishOrnate className="-top-2 -left-2 -rotate-90 z-20" />
            <FlourishOrnate className="-top-2 -right-2 rotate-0 z-20" />
            <FlourishOrnate className="-bottom-2 -right-2 rotate-90 z-20" />
            <FlourishOrnate className="-bottom-2 -left-2 rotate-180 z-20" />

            {isImageLoading && (
              <Skeleton className="absolute inset-0 z-10 rounded-none" />
            )}
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className={cn(
                  "object-cover transition-opacity duration-500",
                  isImageLoading ? "opacity-0" : "opacity-100",
                )}
                priority
                onLoad={() => setIsImageLoading(false)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground font-black text-[10px]">
                PROJECT_VISUAL_MISSING
              </div>
            )}
          </div>

          <div className="p-3 bg-card border-3 border-double">
            {post.images && post.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {post.images.map((img: any) => {
                  const isActive = mainImage === img.url;
                  return (
                    <button
                      key={img.id}
                      onClick={() => {
                        if (!isActive) {
                          setIsImageLoading(true);
                          setSelectedImage(img.url);
                        }
                      }}
                      className={cn(
                        "relative aspect-square w-full overflow-hidden border-3 border-double transition-all",
                        isActive
                          ? "border-primary scale-90"
                          : "border-transparent opacity-40 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={img.url}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="h-3" />

      {/* --- CONTENT TABS --- */}
      <Tabs defaultValue="overview" className="w-full space-y-8">
        <TabsList className="grid w-full grid-cols-3 h-12  border-3 border-double rounded-none p-1">
          <TabsTrigger
            value="overview"
            className="rounded-none font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <LayoutGrid className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger
            value="journey"
            className="rounded-none font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <History className="mr-2 h-4 w-4" /> Journey
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="rounded-none font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Feed (
            {post.commentsCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="mt-0 space-y-10 focus-visible:ring-0"
        >
          <div className="w-full p-6 md:p-10 border-3 border-double bg-background">
            <TiptapRenderer content={post.content || ""} />
          </div>

          {post.githubLink && (
            <div className="space-y-4">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Github className="h-5 w-5" /> Repository Intelligence
              </h3>
              <div className="border-3 border-double p-1 bg-card">
                <GitHubPulseCard githubUrl={post.githubLink} />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="journey" className="mt-0 focus-visible:ring-0">
          <ProjectJourneyTab post={post} isAuthor={isAuthor} />
        </TabsContent>

        <TabsContent value="comments" className="mt-0 focus-visible:ring-0">
          <div className="pb-24 flex flex-col gap-9">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black">Discussions</h2>
              <Badge
                variant="outline"
                className="font-black rounded-none border-3 border-double"
              >
                {post.commentsCount} Logs
              </Badge>
            </div>
            <CommentSection
              postId={post.id}
              totalComments={post.commentsCount}
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
