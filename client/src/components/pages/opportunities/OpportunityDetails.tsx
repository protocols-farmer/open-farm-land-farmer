//src/components/pages/opportunities/OpportunityDetails.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetOpportunityQuery,
  useDeleteOpportunityMutation,
} from "@/lib/features/opportunities/opportunityApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  MapPin,
  Globe,
  Edit,
  ExternalLink,
  AlertTriangle,
  Trash2,
  Loader2,
  MailWarning,
  Building2,
  Sparkles,
  House,
} from "lucide-react";
import { format } from "date-fns";
import { Remarkable } from "remarkable";
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
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const md = new Remarkable({ html: true, linkify: true, typographer: true });

export default function OpportunityDetailsPage({
  opportunityId,
}: {
  opportunityId: string;
}) {
  const router = useRouter();
  const {
    data: opportunity,
    isLoading,
    isError,
  } = useGetOpportunityQuery(opportunityId);
  const [deleteOpportunity, { isLoading: isDeleting }] =
    useDeleteOpportunityMutation();
  const currentUser = useAppSelector(selectCurrentUser);

  const isVerified = currentUser?.isEmailVerified;
  const canModify =
    currentUser?.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN ||
    currentUser?.systemRole === SystemRole.DEVELOPER;

  const handleActionGuard = (e: React.MouseEvent) => {
    if (!isVerified) {
      e.preventDefault();
      toast.error("Please verify your email to perform this action.", {
        icon: <MailWarning className="h-4 w-4 text-destructive" />,
        id: "verify-action-gate",
      });
      return false;
    }
    return true;
  };

  const handleDelete = async () => {
    try {
      await deleteOpportunity(opportunityId).unwrap();
      toast.success("Opportunity harvested successfully.");
      router.push("/opportunities");
    } catch (error) {
      toast.error("Failed to delete opportunity.");
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto py-10 max-w-5xl">
        <Skeleton className="h-150 w-full " />
      </div>
    );

  if (isError || !opportunity)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="p-4  bg-destructive/10 mb-6">
          <AlertTriangle className="h-12 w-12 text-destructive opacity-80" />
        </div>
        <h2 className="text-2xl font-black   italic text-foreground">
          Opportunity not found
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xs">
          This position may have been harvested or removed from the farm.
        </p>
        <Button asChild variant="outline" className="mt-8  px-8">
          <Link href="/opportunities">Back to the opportunities</Link>
        </Button>
      </div>
    );

  const renderedDescription = md.render(opportunity.fullDescription);

  return (
    <div className="container -auto max-w-7xl py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start  gap-6">
              <div className="relative h-24 w-24  overflow-hidden bg-card border shadow-sm flex items-center justify-center group shrink-0">
                {opportunity.companyLogo ? (
                  <Image
                    src={opportunity.companyLogo}
                    alt={opportunity.companyName}
                    fill
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-muted-foreground/30" />
                )}
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black  leading-none text-foreground">
                  {opportunity.title}
                </h1>
                <div className="flex items-center gap-2 text-xl font-medium text-muted-foreground">
                  <span>{opportunity.companyName}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
              <div className="flex items-center gap-2 px-3 py-1.5  bg-muted border">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{opportunity.type.replace("_", " ").toLowerCase()}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5  bg-muted border">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{opportunity.location}</span>
              </div>
              {opportunity.isRemote && (
                <div className="flex items-center gap-2 px-3 py-1.5  bg-primary/10 text-primary border border-primary/20">
                  <House className="h-4 w-4" />
                  <span>Fully remote</span>
                </div>
              )}
            </div>
          </header>

          <section className="space-y-6">
            <h2 className="text-2xl font-black  flex items-center gap-3 text-foreground">
              Job overview
            </h2>
            <div
              className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-lg prose-p:leading-relaxed prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: renderedDescription }}
            />
          </section>

          {(opportunity.responsibilities?.length ?? 0) > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold  border-b pb-2 text-foreground">
                What you'll do
              </h2>
              <ul className="grid grid-cols-1 gap-4">
                {opportunity.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="h-6 w-6  bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-muted-foreground pt-0.5">{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(opportunity.qualifications?.length ?? 0) > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold  border-b pb-2 text-foreground">
                Requirements
              </h2>
              <ul className="grid grid-cols-1 gap-4">
                {opportunity.qualifications.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="h-2 w-2  bg-primary mt-2.5 shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="p-8 bg-card text-card-foreground border-3 border-double relative  rounded-none">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black ">Ready to sow?</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your profile and portfolio are updated before heading
                  to the application portal.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Posted</span>
                  <span className="font-mono text-foreground">
                    {format(new Date(opportunity.postedAt), "MMM d, yyyy")}
                  </span>
                </div>
                {opportunity.salaryRange && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compensation</span>
                    <span className="font-bold text-primary">
                      {opportunity.salaryRange}
                    </span>
                  </div>
                )}
              </div>

              <Button
                asChild
                className="w-full font-bold h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none"
                size="lg"
              >
                <Link
                  href={opportunity.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply on website <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

          {(opportunity.tags?.length ?? 0) > 0 && (
            <div className="space-y-4 px-2">
              <h3 className="text-xs    text-muted-foreground">
                Required skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.tags.map((tag) => (
                  <Badge
                    key={tag.tag.id}
                    variant="outline"
                    className=" font-bold px-3 py-1.5 bg-muted border-border hover:border-primary/30 transition-colors"
                  >
                    {tag.tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {canModify && (
            <div className="pt-8 flex items-center justify-between p-3 gap-3 bg-card border-3 border-double ">
              <Button asChild variant="outline" className="rounded-none">
                <Link
                  href={`/opportunities/${opportunity.id}/update`}
                  onClick={handleActionGuard}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleActionGuard}
                    className="rounded-none text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </AlertDialogTrigger>
                {isVerified && (
                  <AlertDialogContent className="bg-card border-border rounded-none text-card-foreground">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black ">
                        Harvest this post?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        This will permanently remove the position from Open Farm
                        Land. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel className="bg-transparent border-border hover:bg-muted rounded-none">
                        Wait, no
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-none font-bold rounded-none"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Yes, remove it"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
