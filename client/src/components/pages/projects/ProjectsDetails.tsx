"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";

// --- HOOKS & API ---
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- MODULAR COMPONENTS ---
import ProjectJourneyTab from "./ProjectJourneyTab";
import ProjectInteractionHub from "./ProjectInteractionHub";
import GitHubPulseCard from "./GitHubPulseCard"; // NEW: The high-pulse component
import CommentSection from "../posts/CommentSection";

// --- UI COMPONENTS ---
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Edit, Loader2 } from "lucide-react";

/**
 * 1. MAIN EXPORT (Fetching & Error Handling)
 */
export default function ProjectsDetails({ postId }: { postId: string }) {
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();

  // Record view logic
  useEffect(() => {
    if (postId && currentUser) {
      recordPostView(postId);
    }
  }, [postId, currentUser, recordPostView]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Button asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  // Pass data to the internal view once post is guaranteed
  return <ProjectDetailView post={post} currentUser={currentUser} />;
}

/**
 * 2. INTERNAL VIEW (Fixed: No cascading renders, Integrated GitHub Pulse)
 */
interface ProjectDetailViewProps {
  post: any; // Ideally use PostDto from your types
  currentUser: any;
}

function ProjectDetailView({ post, currentUser }: ProjectDetailViewProps) {
  // FIX: Instead of useEffect, we initialize state directly from props
  // If the user clicks a thumbnail, this local state updates normally.
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    post.images?.[0]?.url
  );

  // FIX: Use useMemo for heavy sanitization instead of useEffect + setState
  const sanitizedContent = useMemo(
    () => (post.content ? DOMPurify.sanitize(post.content) : ""),
    [post.content]
  );

  const isAuthor = currentUser?.id === post.authorId;

  return (
    <section className="space-y-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* --- Image Section --- */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 h-fit">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-muted">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map((img: any) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === img.url
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

        {/* --- Header & Meta Section --- */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <header className="space-y-4">
            <Link
              href={`/profile/${post.author.username}`}
              className="flex items-center gap-4 w-fit"
            >
              <Avatar className="h-12 w-12 border">
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
                  Posted{" "}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>

            {isAuthor && (
              <Button asChild variant="outline" className="w-full">
                <Link href={`/posts/${post.id}/update`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Project
                </Link>
              </Button>
            )}
          </header>

          <ProjectInteractionHub post={post} />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Technologies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {post.tags.map((postTag: any) => (
                <Badge key={postTag.tag.id} variant="secondary">
                  # {postTag.tag.name}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.githubLink ? (
              <Button asChild className="w-full">
                <a
                  href={post.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            ) : (
              <div className="text-sm text-center text-muted-foreground p-3 rounded-md border border-dashed">
                No GitHub link
              </div>
            )}
            {post.externalLink ? (
              <Button variant="outline" asChild className="w-full">
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            ) : (
              <div className="text-sm text-center text-muted-foreground p-3 rounded-md border border-dashed">
                No live demo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Tabs Section --- */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="comments">
            Comments ({post.commentsCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About the Project</CardTitle>
            </CardHeader>
            <CardContent
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </Card>

          {/* === GITHUB PULSE INTEGRATION === */}
          {/* We replace the old AuthorProfileCard with our new Pulse Insight logic */}
          {post.githubLink && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Repository Insights</h3>
              <GitHubPulseCard githubUrl={post.githubLink} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="journey" className="mt-6">
          <ProjectJourneyTab post={post} isAuthor={isAuthor} />
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentSection
                postId={post.id}
                totalComments={post.commentsCount}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
