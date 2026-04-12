//src/components/pages/admin/opportunities/OpportunityManagement.tsx
"use client";

import React, { useState } from "react";
import {
  useGetAdminOpportunitiesQuery,
  useDeleteOpportunityMutation,
} from "@/lib/features/admin/adminApiSlice";
import {
  AdminOpportunityRow,
  OpportunityType,
} from "@/lib/features/admin/adminTypes";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Trash2,
  Eye,
  MapPin,
  Building2,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import ManagementPageLayout from "../layouts/ManagementPageLayout";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/shared/PaginationControls";

const getTypeStyles = (type: OpportunityType) => {
  const styles: Record<OpportunityType, string> = {
    [OpportunityType.FULL_TIME]:
      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    [OpportunityType.PART_TIME]:
      "bg-blue-500/10 text-blue-500 border-blue-500/20",
    [OpportunityType.CONTRACT]:
      "bg-orange-500/10 text-orange-500 border-orange-500/20",
    [OpportunityType.INTERNSHIP]:
      "bg-purple-500/10 text-purple-500 border-purple-500/20",
    [OpportunityType.FREELANCE]:
      "bg-pink-500/10 text-pink-500 border-pink-500/20",
  };
  return styles[type] || "bg-secondary text-secondary-foreground";
};

function OpportunityActions({
  opportunity,
}: {
  opportunity: AdminOpportunityRow;
}) {
  const [deleteOpportunity, { isLoading }] = useDeleteOpportunityMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteOpportunity(opportunity.id).unwrap();
      toast.success("Opportunity listing purged.");
    } catch {
      toast.error("Failed to delete opportunity.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-none">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/opportunities/${opportunity.id}`}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            onClick={() => setIsAlertOpen(true)}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete Opportunity
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Opportunity?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>{opportunity.title}</strong>{" "}
              from the platform. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function OpportunityManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useGetAdminOpportunitiesQuery({
    page,
    q: debouncedSearch,
  });

  const opportunities = data?.data.opportunities ?? [];
  const pagination = data?.data.pagination;

  return (
    <ManagementPageLayout
      title="Opportunity Management"
      description="Monitor and moderate job listings, internships, and freelance gigs."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Search title, company, or poster..."
          className="w-72 rounded-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="rounded-none border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[30%]">Opportunity</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Poster</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32 italic">
                  <Loader2 className="animate-spin h-6 w-6 mx-auto mb-2" />
                  Syncing opportunities...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-destructive font-bold"
                >
                  Error: Could not retrieve opportunity data.
                </TableCell>
              </TableRow>
            ) : opportunities.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-muted-foreground"
                >
                  No listings match your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              opportunities.map((opp) => (
                <TableRow
                  key={opp.id}
                  className="group transition-colors hover:bg-muted/50"
                >
                  {/* 🚜 Fixed: Added max-w and ensured line-clamp works with a container */}
                  <TableCell className="font-bold align-top max-w-70">
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-foreground line-clamp-1 truncate"
                        title={opp.title}
                      >
                        {opp.title}
                      </span>
                      <div className="flex items-center text-[10px] text-muted-foreground font-mono">
                        <MapPin className="mr-1 h-3 w-3" /> {opp.location}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span
                        className="text-sm truncate max-w-35"
                        title={opp.companyName}
                      >
                        {opp.companyName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="align-top">
                    <Badge
                      variant="outline"
                      className={`rounded-none border-0 px-2 py-0 text-[10px] font-bold ${getTypeStyles(opp.type)}`}
                    >
                      {opp.type.replace("_", " ")}
                    </Badge>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 border rounded-none">
                        <AvatarImage
                          src={opp.poster.profileImage ?? undefined}
                        />
                        <AvatarFallback className="rounded-none text-[10px]">
                          {opp.poster.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold">
                        @{opp.poster.username}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="align-top text-[11px] text-muted-foreground whitespace-nowrap font-medium">
                    {format(new Date(opp.postedAt), "MMM d, yyyy")}
                  </TableCell>

                  <TableCell className="text-right align-top">
                    <OpportunityActions opportunity={opp} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="mt-4">
          <PaginationControls pagination={pagination} onPageChange={setPage} />
        </div>
      )}
    </ManagementPageLayout>
  );
}
