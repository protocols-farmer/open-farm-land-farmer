// src/components/pages/opportunities/EditOpportunityPage.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import { useGetOpportunityQuery } from "@/lib/features/opportunities/opportunityApiSlice";
import OpportunityForm from "./OpportunityForm";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export default function EditOpportunityPage({
  opportunityId,
}: {
  opportunityId: string;
}) {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const {
    data: opportunity,
    isLoading,
    isError,
  } = useGetOpportunityQuery(opportunityId);

  // Authorization Check
  useEffect(() => {
    if (
      currentUser &&
      !(
        currentUser.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR ||
        currentUser.systemRole === SystemRole.SUPER_ADMIN
      )
    ) {
      toast.error("You are not authorized to access this page.");
      router.push("/opportunities");
    }
    if (isError) {
      toast.error("Could not load opportunity to edit.");
      router.push("/opportunities");
    }
  }, [currentUser, isError, router]);

  if (isLoading)
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <Skeleton className="h-[500px] w-full" />
      </div>
    );

  if (
    !currentUser ||
    !(
      currentUser.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR ||
      currentUser.systemRole === SystemRole.SUPER_ADMIN
    )
  ) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Edit Opportunity</h1>
        <p className="text-muted-foreground">
          Update the details for this job opening.
        </p>
      </div>
      {opportunity && <OpportunityForm existingOpportunity={opportunity} />}
    </div>
  );
}
