"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DOMPurify from "dompurify"; // Added for security
import { Remarkable } from "remarkable";
import toast from "react-hot-toast";
import Link from "next/link";
import "highlight.js/styles/github-dark.css"; // Added for code blocks

// --- REDUX & AUTH IMPORTS (Fixed missing names) ---
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";

// --- API HOOKS ---
import {
  useGetUpdateQuery,
  useDeleteUpdateMutation,
} from "@/lib/features/updates/updateApiSlice";

// --- UI COMPONENTS ---
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  BellRing,
  Bot,
  Megaphone,
  Loader2,
  AlertTriangle,
  Edit,
  Trash2,
  Terminal,
} from "lucide-react";
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

const md = new Remarkable({ html: true, linkify: true, typographer: true });

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "APP_UPDATE":
      return <Bot className="h-5 w-5 text-blue-500" />;
    case "MARKETING":
      return <Megaphone className="h-5 w-5 text-purple-500" />;
    case "COMMUNITY":
      return <BellRing className="h-5 w-5 text-orange-500" />;
    default:
      return <BellRing className="h-5 w-5" />;
  }
};

export default function UpdateDetails({ updateId }: { updateId: string }) {
  const router = useRouter();
  const {
    data: update,
    isLoading,
    isError,
  } = useGetUpdateQuery(updateId, { skip: !updateId });

  const [deleteUpdate, { isLoading: isDeleting }] = useDeleteUpdateMutation();
  const currentUser = useAppSelector(selectCurrentUser);

  const canModify =
    currentUser?.systemRole === SystemRole.DEVELOPER ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN;

  /**
   * PERFORMANCE FIX: useMemo handles parsing + sanitization.
   * Extracted 'content' inside to satisfy the React Compiler's dependency tracking.
   */
  const renderedContent = useMemo(() => {
    const content = update?.content; // Extracting to match dependency array
    if (!content) return "";

    // 1. Parse Markdown
    const rawHtml = md.render(content);

    // 2. Sanitize and keep highlight.js classes
    return DOMPurify.sanitize(rawHtml, {
      ADD_ATTR: ["class"],
    });
  }, [update?.content]);

  const handleDelete = async () => {
    try {
      await deleteUpdate(updateId).unwrap();
      toast.success("Update deleted successfully.");
      router.refresh();
      router.push("/updates");
    } catch {
      toast.error("Failed to delete update.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );

  if (isError || !update)
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-md mx-auto text-center space-y-4">
          <Terminal className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            System Log Missing
          </h2>
          <p className="text-muted-foreground">
            The requested update could not be loaded.
          </p>
          <Button variant="outline" asChild>
            <Link href="/updates">Back to Updates</Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl py-8 px-4 animate-in fade-in duration-500">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest">
            {getCategoryIcon(update.category)}
            <span>{update.category.replace("_", " ")}</span>
          </div>

          {update.version && (
            <p className="text-sm font-black text-primary uppercase tracking-tighter">
              v{update.version}
            </p>
          )}

          <h1 className="text-4xl font-black uppercase tracking-tighter md:text-6xl leading-none break-all">
            {update.title}
          </h1>

          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Published {format(new Date(update.publishedAt), "MMMM dd, yyyy")}
          </p>
        </header>

        {canModify && (
          <div className="flex justify-center gap-2">
            <Button asChild variant="outline" size="sm" className="font-bold">
              <Link href={`/updates/${update.id}/update`}>
                <Edit className="mr-2 h-4 w-4" /> Edit log
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="font-bold">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-black uppercase tracking-tighter text-2xl">
                    Confirm Deletion
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove this harvest update. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-bold">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground font-bold"
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Delete Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        <Separator className="bg-primary/10" />

        <div
          // Added prose-neutral and prose-quoteless for the clean Open Farmland aesthetic
          className="prose prose-lg prose-neutral prose-quoteless dark:prose-invert mx-auto max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </article>
    </div>
  );
}
