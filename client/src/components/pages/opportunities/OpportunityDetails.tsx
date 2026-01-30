// src/components/pages/opportunities/OpportunityDetailsPage.tsx
"use client";

import React, { useState } from "react";
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

  const canModify =
    currentUser?.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN;

  const handleDelete = async () => {
    try {
      await deleteOpportunity(opportunityId).unwrap();
      toast.success("Opportunity deleted successfully.");
      router.push("/opportunities");
    } catch (error) {
      toast.error("Failed to delete opportunity.");
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  if (isError || !opportunity)
    return (
      <div className="text-center py-10 text-destructive">
        <AlertTriangle className="mx-auto h-12 w-12" />
        <p className="mt-4">Opportunity not found.</p>
      </div>
    );

  const renderedDescription = md.render(opportunity.fullDescription);

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
              {opportunity.companyLogo && (
                <Image
                  src={opportunity.companyLogo}
                  alt={`${opportunity.companyName} logo`}
                  fill
                  className="object-contain p-2"
                />
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight break-all">
                {opportunity.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {opportunity.companyName}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{opportunity.type.replace("_", " ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{opportunity.location}</span>
            </div>
            {opportunity.isRemote && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Remote</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Posted on {format(new Date(opportunity.postedAt), "MMMM d, yyyy")}
          </p>

          {/* MODIFIED: Edit and Delete buttons */}
          {canModify && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild>
                <Link href={`/opportunities/${opportunity.id}/update`}>
                  <Edit className="mr-2 h-4 w-4" />
                  update
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this opportunity.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Yes, delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </header>
        <Separator />
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedDescription }}
        />

        {opportunity.responsibilities &&
          opportunity.responsibilities.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                {opportunity.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        {opportunity.qualifications &&
          opportunity.qualifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                Qualifications
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                {opportunity.qualifications.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        {opportunity.tags && opportunity.tags.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag) => (
                <Badge key={tag.tag.id} variant="secondary">
                  {tag.tag.name}
                </Badge>
              ))}
            </div>
          </section>
        )}
        <Separator />
        <div className="text-center">
          <Button asChild size="lg">
            <Link
              href={opportunity.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
