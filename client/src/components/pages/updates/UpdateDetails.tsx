"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Remarkable } from "remarkable";
import toast from "react-hot-toast";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";

import {
  useGetUpdateQuery,
  useDeleteUpdateMutation,
} from "@/lib/features/updates/updateApiSlice";

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
  MailWarning,
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
import { cn } from "@/lib/utils";

const md = new Remarkable({ html: true, linkify: true, typographer: true });

// 🚜 Refined: Using theme-aware primary color instead of hard-coded blues/purples
const getCategoryIcon = (category: string) => {
  const iconProps = "h-5 w-5 text-primary";
  switch (category) {
    case "APP_UPDATE":
      return <Bot className={iconProps} />;
    case "MARKETING":
      return <Megaphone className={iconProps} />;
    case "COMMUNITY":
      return <BellRing className={iconProps} />;
    default:
      return <BellRing className={iconProps} />;
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

  const isVerified = currentUser?.isEmailVerified;
  const canModify =
    currentUser?.systemRole === SystemRole.DEVELOPER ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN ||
    currentUser?.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR;

  const handleActionGuard = (e: React.MouseEvent) => {
    if (!isVerified) {
      e.preventDefault();
      toast.error("Verification required for system log modifications.", {
        icon: <MailWarning className="h-4 w-4 text-destructive" />,
        id: "update-action-gate",
      });
      return false;
    }
    return true;
  };

  const renderedContent = useMemo(() => {
    const content = update?.content;
    if (!content) return "";
    const rawHtml = md.render(content);
    return DOMPurify.sanitize(rawHtml, { ADD_ATTR: ["class"] });
  }, [update?.content]);

  const handleDelete = async () => {
    try {
      await deleteUpdate(updateId).unwrap();
      toast.success("System log purged successfully.");
      router.push("/updates");
    } catch {
      toast.error("Failed to delete the update.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );

  if (isError || !update)
    return (
      <div className="container mx-auto py-32 text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-destructive/10">
          <Terminal className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter uppercase italic">
          System log missing
        </h2>
        <Button variant="outline" asChild className="rounded-full px-8">
          <Link href="/updates">Back to the updates</Link>
        </Button>
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl py-12 md:py-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <article className="space-y-12">
        <header className="space-y-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest uppercase border border-border">
              {getCategoryIcon(update.category)}
              <span>{update.category.replace("_", " ").toLowerCase()}</span>
            </div>
            {update.version && (
              <Badge
                variant="secondary"
                className="font-mono font-black text-primary px-3 py-1 bg-primary/10 border-none"
              >
                {update.version.toLowerCase().startsWith("v")
                  ? update.version
                  : `v${update.version}`}{" "}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-black tracking-tighter md:text-7xl leading-[0.9] text-foreground">
            {update.title}
          </h1>

          <p className="text-sm text-muted-foreground tracking-widest font-black uppercase">
            Published {format(new Date(update.publishedAt), "MMMM dd, yyyy")}
          </p>
        </header>

        {canModify && (
          <div className="flex justify-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full font-bold px-6 border-border hover:bg-muted",
                !isVerified && "opacity-50 grayscale",
              )}
            >
              <Link
                href={`/updates/${update.id}/update`}
                onClick={handleActionGuard}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit log
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full font-bold px-6 text-destructive hover:bg-destructive/10",
                    !isVerified && "opacity-50",
                  )}
                  onClick={handleActionGuard}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              {isVerified && (
                <AlertDialogContent className="bg-card border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-black tracking-tighter text-3xl italic uppercase">
                      Purge this log?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      This will permanently remove this system log from the
                      farm. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel className="rounded-full font-bold">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground font-bold rounded-full px-8 hover:bg-destructive/90"
                    >
                      {isDeleting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Confirm purge"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </div>
        )}

        <Separator className="bg-border" />

        <div
          className="prose prose-lg prose-zinc dark:prose-invert mx-auto max-w-none break-words prose-p:text-muted-foreground prose-headings:font-black prose-headings:tracking-tighter"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </article>
    </div>
  );
}
