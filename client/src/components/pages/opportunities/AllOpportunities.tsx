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
      {/* 🚜 Action Button: Floating for better UX and clean design */}
      {canCreate && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            asChild
            size="lg"
            className="rounded-full font-black uppercase tracking-tighter h-14 px-8 shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Link href="/opportunities/create" onClick={handleCreateClick}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Post opportunity
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
