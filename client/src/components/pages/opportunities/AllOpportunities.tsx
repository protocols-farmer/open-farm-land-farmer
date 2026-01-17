// src/components/pages/opportunities/AllOpportunitiesPage.tsx
"use client";

import React from "react";
import { useGetOpportunitiesQuery } from "@/lib/features/opportunities/opportunityApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import OpportunityCard from "./OpportunityCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, AlertTriangle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AllOpportunitiesPage() {
  const { data: response, isLoading, isError } = useGetOpportunitiesQuery();
  const currentUser = useAppSelector(selectCurrentUser);

  const opportunities = response?.data || [];

  const canCreate =
    currentUser?.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN;

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="mb-10 text-center">
        <Briefcase className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold mt-4 tracking-tight">
          Career Opportunities
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Find your next role. We are looking for talented individuals to join
          our mission.
        </p>
        {canCreate && (
          <Button asChild size="lg" className="mt-6">
            <Link href="/opportunities/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Post New Opportunity
            </Link>
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-10 text-destructive">
          <AlertTriangle className="mx-auto h-12 w-12" />
          <p className="mt-4">Failed to load opportunities.</p>
        </div>
      )}

      {!isLoading && !isError && opportunities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}

      {!isLoading && !isError && opportunities.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No open opportunities at the moment. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
