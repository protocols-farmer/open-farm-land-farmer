"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";

// --- Assuming these are in a shared folder ---
import PostInteractionHub from "../../shared/PostInteractionHub";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Edit, ExternalLink, Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Helper function (can be moved to utils) ---
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
      { rootMargin: "0px 0px -80% 0px" }
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">In this article</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-primary",
                  activeId === heading.id && "font-semibold text-primary"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// --- Main Article Details Component ---
export default function ArticleDetails({ postId }: { postId: string }) {
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();
  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  useEffect(() => {
    if (post?.images && post.images.length > 0)
      setMainImage(post.images[0].url);
  }, [post]);

  const { sanitizedContent, headings } = useMemo(() => {
    if (!post?.content) return { sanitizedContent: "", headings: [] };
    if (typeof window === "undefined")
      return { sanitizedContent: post.content, headings: [] };

    const cleanHtml = DOMPurify.sanitize(post.content, {
      USE_PROFILES: { html: true },
    });
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    const h2Elements = Array.from(tempDiv.querySelectorAll("h2"));
    const extractedHeadings = h2Elements.map((el) => {
      const text = el.innerText;
      const id = slugify(text);
      el.id = id;
      return { id, text };
    });

    return { sanitizedContent: tempDiv.innerHTML, headings: extractedHeadings };
  }, [post?.content]);

  if (isLoading) return <p>Loading article...</p>;
  if (isError || !post) return <p>Could not load article.</p>;

  return (
    <section className="mx-auto max-w-7xl py-8 space-y-12">
      {/* === Main 50/50 Grid (Resource/Project Layout) === */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* === Left Column: Sticky Image Gallery === */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border">
            {mainImage && (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
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

        {/* === Right Column: All Metadata & Actions === */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <header className="space-y-4">
            <Badge variant="secondary" className="w-fit capitalize">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl break-all ">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground break-all">
              {post.description}
            </p>
            {currentUser?.id === post.author.id && (
              <Button asChild variant="outline" className="w-full">
                <Link href={`/posts/${post.id}/update`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
            )}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Link
                href={`/user/${post.author.username}`}
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
                No external link provided
              </div>
            )}
          </div>

          {/* Table of Contents is now here, inside the right column */}
          <TableOfContents headings={headings} />
        </div>
      </div>

      <Separator />

      {/* === Main Article Content (Below the Grid) === */}
      <div className="mx-auto max-w-4xl">
        <div
          className="prose prose-lg dark:prose-invert max-w-none break-all"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      <Separator />

      {/* --- Comments Section --- */}
      <div id="comments">
        <Card>
          <CardHeader>
            <CardTitle>Comments ({post.commentsCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto max-w-4xl">
              <div
                className="prose prose-lg dark:prose-invert max-w-none break-all"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>{" "}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
