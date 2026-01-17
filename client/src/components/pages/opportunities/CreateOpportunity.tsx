// src/components/pages/opportunities/CreateOpportunityPage.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import OpportunityForm from "./OpportunityForm";
import toast from "react-hot-toast";

export default function CreateOpportunityPage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);

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
  }, [currentUser, router]);

  // Avoid rendering the form if the user is not authorized to prevent content flash
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
        <h1 className="text-3xl font-bold">Post a New Opportunity</h1>
        <p className="text-muted-foreground">
          Fill out the details below to post a new job opening.
        </p>
      </div>
      <OpportunityForm />
    </div>
  );
}
