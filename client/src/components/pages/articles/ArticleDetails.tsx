"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";

// --- REDUX & AUTH IMPORTS (Fixed missing imports) ---
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- API HOOKS ---
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
} from "@/lib/features/post/postApiSlice";

// --- SHARED COMPONENTS ---
import PostInteractionHub from "../../shared/PostInteractionHub";
import CommentSection from "../posts/CommentSection";

// --- UI COMPONENTS ---
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Edit, ExternalLink, Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

// --- Table of Contents Sub-component ---
const TableOfContents = ({
  headings,
}: {
  headings: { id: string; text: string }[];
}) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => {
      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <Card className="bg-muted/30 border-none shadow-none">
      <CardHeader className="px-4 pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
          In this article
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <ul className="space-y-2 text-sm">
          {headings.map(
            (
              heading: any, // Fixed implicit any
            ) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    "block py-1 text-muted-foreground transition-all hover:translate-x-1 hover:text-primary",
                    activeId === heading.id &&
                      "font-bold text-primary border-l-2 border-primary pl-2 ml-[-10px]",
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ),
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default function ArticleDetails({ postId }: { postId: string }) {
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();

  /**
   * FIX 1: DERIVED IMAGE LOGIC
   * mainImage calculates instantly from render. Eliminates cascading render error.
   */
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const mainImage = selectedImage || post?.images?.[0]?.url;

  /**
   * FIX 2: MEMOIZED CONTENT & HEADINGS
   * Handles sanitization and TOC generation in one pass during render.
   */
  const { sanitizedContent, headings } = useMemo(() => {
    const content = post?.content;
    if (!content) return { sanitizedContent: "", headings: [] };

    // Added ADD_ATTR: ['class'] to preserve highlight.js syntax colors
    const cleanHtml = DOMPurify.sanitize(content, {
      ADD_ATTR: ["class"],
      USE_PROFILES: { html: true },
    });

    if (typeof window === "undefined")
      return { sanitizedContent: cleanHtml, headings: [] };

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    const h2Elements = Array.from(tempDiv.querySelectorAll("h2"));

    const extractedHeadings = h2Elements.map((el) => {
      const text = (el as HTMLElement).innerText; // Fixed cast for TS
      const id = slugify(text);
      el.id = id;
      return { id, text };
    });

    return { sanitizedContent: tempDiv.innerHTML, headings: extractedHeadings };
  }, [post?.content]);

  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  if (isLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="animate-pulse text-muted-foreground uppercase font-black tracking-widest">
          Preparing Article...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Alert variant="destructive" className="max-w-xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Article Not Found</AlertTitle>
          <AlertDescription>
            This article has returned to the digital soil.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl py-8 space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* --- Left Column: Sticky Image Gallery --- */}
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
              <div className="h-full w-full flex items-center justify-center text-muted-foreground uppercase text-xs font-bold">
                No images provided
              </div>
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map(
                (
                  img: any, // Fixed implicit any
                ) => (
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
                ),
              )}
            </div>
          )}
        </div>

        {/* --- Right Column: Metadata & Table of Contents --- */}
        <div className="flex flex-col space-y-6">
          <header className="space-y-4">
            <Badge variant="secondary" className="w-fit capitalize font-bold">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-black uppercase  md:text-5xl leading-none break-all">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
            {currentUser?.id === post.author.id && (
              <Button asChild variant="outline" className="w-full font-bold">
                <Link href={`/posts/${post.id}/update`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Article
                </Link>
              </Button>
            )}
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
                    Posted{" "}
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
              {post.tags.map(
                (
                  postTag: any, // Fixed implicit any
                ) => (
                  <Badge
                    key={postTag.tag.id}
                    variant="outline"
                    className="bg-background"
                  >
                    # {postTag.tag.name}
                  </Badge>
                ),
              )}
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

          <TableOfContents headings={headings} />
        </div>
      </div>

      <Separator />

      {/* --- Main Content Section --- */}
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="prose prose-lg prose-neutral prose-quoteless dark:prose-invert max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      <Separator />

      {/* --- Comments Section --- */}
      <div id="comments" className="max-w-4xl mx-auto w-full">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-black uppercase ">
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
    </section>
  );
}
