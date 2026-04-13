//src/components/pages/opportunities/AllOpportunities.tsx
"use client";

import OpportunityFilterPage from "./OpportunityFilterPage";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { SystemRole } from "@/lib/features/user/userTypes";
import { Button } from "@/components/ui/button";
import { PlusCircle, MailWarning } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AllOpportunitiesPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const isVerified = currentUser?.isEmailVerified;

  const canCreate =
    currentUser?.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN ||
    currentUser?.systemRole === SystemRole.DEVELOPER;

  const handleCreateClick = (e: React.MouseEvent) => {
    if (!isVerified) {
      e.preventDefault();
      toast.error("Please verify your email to post new opportunities.", {
        icon: <MailWarning className="h-4 w-4 text-destructive" />,
        id: "verify-gate",
      });
    }
  };

  return (
    <div className="relative">
      {canCreate && (
        <div className="absolute top-12 md:top-20 right-6 md:right-12 z-20">
          <Button asChild variant="default" className="rounded-none font-bold">
            <Link href="/opportunities/create" onClick={handleCreateClick}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Opportunity{" "}
            </Link>
          </Button>
        </div>
      )}

      <OpportunityFilterPage
        title="Career Board"
        subtitle="Find your next role in the ecosystem. We're looking for builders to join the digital harvest."
        searchPlaceholder="Search by title, company, or keywords..."
      />
    </div>
  );
}
