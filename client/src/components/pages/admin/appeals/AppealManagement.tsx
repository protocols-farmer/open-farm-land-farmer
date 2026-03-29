//src/components/pages/admin/appeals/AppealManagement.tsx
"use client";

import React, { useState } from "react";
import {
  useGetAdminAppealsQuery,
  useReviewAppealMutation,
} from "@/lib/features/appeals/appealApiSlice";
import { AppealRow, AppealStatus } from "@/lib/features/appeals/appealTypes";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Link from "next/link";
import ManagementPageLayout from "../layouts/ManagementPageLayout";
import PaginationControls from "@/components/shared/PaginationControls";

function ReviewAppealModal({
  appeal,
  isOpen,
  onClose,
}: {
  appeal: AppealRow | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [reviewAppeal, { isLoading }] = useReviewAppealMutation();
  const [status, setStatus] = useState<AppealStatus>("APPROVED");
  const [adminNotes, setAdminNotes] = useState("");

  if (!appeal) return null;

  const handleReviewSubmit = async () => {
    try {
      await reviewAppeal({
        id: appeal.id,
        data: {
          status,
          adminNotes: adminNotes.trim() || undefined,
        },
      }).unwrap();

      toast.success(`Appeal has been ${status.toLowerCase()}.`);
      onClose();
      setAdminNotes(""); // Reset
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to process appeal.");
    }
  };

  const isPending = appeal.status === "PENDING";

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPending ? "Review Appeal:" : "Appeal Details:"} @
            {appeal.user.username}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPending
              ? `Carefully review the user's defense against their current ${appeal.sanction.type.toLowerCase()}.`
              : "This appeal has already been processed by the moderation team."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Context Boxes - Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                Original Sanction Reason
              </p>
              <p className="text-sm text-foreground">
                "{appeal.sanction.reason}"
              </p>
            </div>
            <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
              <p className="text-xs font-bold text-primary uppercase mb-1">
                User's Appeal Defense
              </p>
              <p className="text-sm text-foreground italic break-words">
                "{appeal.reason}"
              </p>
            </div>
          </div>

          {/* Logic Split: Form (Pending) vs Receipt (Processed) */}
          <div className="space-y-4 border-t border-border pt-4">
            {isPending ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Decision</label>
                  <Select
                    value={status}
                    onValueChange={(val) => setStatus(val as AppealStatus)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APPROVED">
                        Approve (Restore Access)
                      </SelectItem>
                      <SelectItem value="REJECTED">
                        Reject (Maintain Sanction)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Internal Admin Notes (Optional)
                  </label>
                  <Textarea
                    placeholder="E.g., Second chance given, user showed genuine remorse..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="resize-none"
                  />
                </div>
              </>
            ) : (
              // Read-Only Receipt View
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground mb-1">
                      Final Decision
                    </p>
                    <Badge
                      variant={
                        appeal.status === "APPROVED" ? "default" : "destructive"
                      }
                      className={
                        appeal.status === "APPROVED"
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : ""
                      }
                    >
                      {appeal.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted-foreground mb-1">
                      Reviewed By
                    </p>
                    <p className="text-sm font-medium">
                      @{appeal.reviewer?.username || "Unknown Admin"}
                    </p>
                  </div>
                </div>

                {appeal.adminNotes && (
                  <div className="bg-muted p-3 rounded-md border border-border mt-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                      Internal Notes
                    </p>
                    <p className="text-sm italic text-foreground">
                      "{appeal.adminNotes}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {isPending ? "Cancel" : "Close"}
          </AlertDialogCancel>

          {/* Only show the Confirm button if the appeal is still pending */}
          {isPending && (
            <Button
              onClick={handleReviewSubmit}
              disabled={isLoading}
              variant={status === "APPROVED" ? "default" : "destructive"}
            >
              {isLoading
                ? "Processing..."
                : `Confirm ${status === "APPROVED" ? "Approval" : "Rejection"}`}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function AppealManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedAppeal, setSelectedAppeal] = useState<AppealRow | null>(null);

  const { data, isLoading, isError } = useGetAdminAppealsQuery({
    page,
    q: debouncedSearchTerm,
  });

  const appeals = data?.data.appeals ?? [];
  const pagination = data?.data.pagination;

  const getStatusBadge = (status: AppealStatus) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary">PENDING REVIEW</Badge>;
      case "APPROVED":
        return (
          <Badge
            variant="default"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            APPROVED
          </Badge>
        );
      case "REJECTED":
        return <Badge variant="destructive">REJECTED</Badge>;
    }
  };

  return (
    <ManagementPageLayout
      title="Appeal Management"
      description="Review and process user requests to lift bans and suspensions."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Search username or email..."
          className="w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Sanction Type</TableHead>
            <TableHead>Appeal Status</TableHead>
            <TableHead>Submitted On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                Loading appeals...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-destructive"
              >
                Failed to load appeals.
              </TableCell>
            </TableRow>
          ) : appeals.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-muted-foreground"
              >
                No appeals found.
              </TableCell>
            </TableRow>
          ) : (
            appeals.map((appeal) => (
              <TableRow key={appeal.id}>
                <TableCell>
                  <Link
                    href={`/profile/${appeal.user.username}`}
                    className="flex items-center gap-3 group"
                  >
                    <Avatar>
                      <AvatarImage
                        src={appeal.user.profileImage ?? undefined}
                      />
                      <AvatarFallback>
                        {appeal.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium group-hover:underline">
                        @{appeal.user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appeal.user.email}
                      </p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {appeal.sanction.type}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(appeal.status)}</TableCell>
                <TableCell>
                  {format(new Date(appeal.createdAt), "PP")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAppeal(appeal)}
                  >
                    {appeal.status === "PENDING"
                      ? "Review Case"
                      : "View Details"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination && (
        <PaginationControls pagination={pagination} onPageChange={setPage} />
      )}

      {/* The Review Modal */}
      <ReviewAppealModal
        appeal={selectedAppeal}
        isOpen={!!selectedAppeal}
        onClose={() => setSelectedAppeal(null)}
      />
    </ManagementPageLayout>
  );
}
