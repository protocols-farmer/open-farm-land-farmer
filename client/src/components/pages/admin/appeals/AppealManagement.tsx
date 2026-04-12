//src/components/pages/admin/appeals/AppealManagement.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAdminAppealsQuery,
  useReviewAppealMutation,
} from "@/lib/features/appeals/appealApiSlice";
import { AppealRow, AppealStatus } from "@/lib/features/appeals/appealTypes";
import {
  reviewAppealSchema,
  ReviewAppealFormValues,
} from "@/lib/schemas/appeal.schemas";
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
import { Loader2 } from "lucide-react";

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

  // 🚜 Initialize Form with Zod Logic
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewAppealFormValues>({
    resolver: zodResolver(reviewAppealSchema),
    defaultValues: {
      status: "APPROVED",
      adminNotes: "",
    },
  });

  const selectedStatus = watch("status");
  const notesText = watch("adminNotes") || "";
  const isPending = appeal?.status === "PENDING";

  // Reset form when modal closes or a different appeal is selected
  useEffect(() => {
    if (isOpen) {
      reset({
        status: "APPROVED",
        adminNotes: "",
      });
    }
  }, [isOpen, reset]);

  if (!appeal) return null;

  const onReviewSubmit = async (values: ReviewAppealFormValues) => {
    try {
      await reviewAppeal({
        id: appeal.id,
        data: values,
      }).unwrap();

      toast.success(`Appeal has been ${values.status.toLowerCase()}.`);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to process appeal.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">
            {isPending ? "Review Appeal:" : "Appeal Details:"} @
            {appeal.user.username}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPending
              ? `Review the user's defense against their current ${appeal.sanction.type.toLowerCase()}.`
              : "This appeal has already been processed."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Context Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 border rounded-none">
              <p className="text-[10px] font-black text-muted-foreground  mb-2 ">
                Original Sanction Reason
              </p>
              <p className="text-sm leading-relaxed">
                "{appeal.sanction.reason}"
              </p>
            </div>
            <div className="bg-primary/5 p-4 border border-primary/20 rounded-none">
              <p className="text-[10px] font-black text-primary  mb-2 ">
                User's Appeal Defense
              </p>
              <p className="text-sm leading-relaxed italic wrap-break-words">
                "{appeal.reason}"
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            {isPending ? (
              <form
                onSubmit={handleSubmit(onReviewSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold">Decision</label>
                  <Select
                    onValueChange={(val) =>
                      setValue("status", val as "APPROVED" | "REJECTED")
                    }
                    defaultValue="APPROVED"
                  >
                    <SelectTrigger className="rounded-none">
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
                  {errors.status && (
                    <p className="text-xs text-destructive">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold">
                      Internal Admin Notes
                    </label>
                    <span
                      className={`text-[10px]  ${notesText.length > 1000 ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {notesText.length}/1000
                    </span>
                  </div>
                  <Textarea
                    placeholder="Provide technical context for this decision..."
                    {...register("adminNotes")}
                    className="resize-none min-h-30 rounded-none"
                  />
                  {errors.adminNotes && (
                    <p className="text-xs text-destructive">
                      {errors.adminNotes.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="outline"
                      className="rounded-none"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant={
                      selectedStatus === "APPROVED" ? "default" : "destructive"
                    }
                    className="rounded-none min-w-35 font-bold"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Confirm{" "}
                    {selectedStatus === "APPROVED" ? "Approval" : "Rejection"}
                  </Button>
                </div>
              </form>
            ) : (
              /* Read-Only History View */
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground  mb-2">
                      Final Decision
                    </p>
                    <Badge
                      variant={
                        appeal.status === "APPROVED" ? "default" : "destructive"
                      }
                      className={
                        appeal.status === "APPROVED"
                          ? "bg-emerald-500 rounded-none px-4"
                          : "rounded-none px-4"
                      }
                    >
                      {appeal.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground  mb-2">
                      Reviewed By
                    </p>
                    <p className="text-sm ">
                      @{appeal.reviewer?.username || "System"}
                    </p>
                  </div>
                </div>

                {appeal.adminNotes && (
                  <div className="bg-muted p-4 border rounded-none">
                    <p className="text-[10px] font-black text-muted-foreground  mb-2 ">
                      Internal Notes
                    </p>
                    <p className="text-sm italic">"{appeal.adminNotes}"</p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="outline"
                      className="rounded-none px-8"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </AlertDialogCancel>
                </div>
              </div>
            )}
          </div>
        </div>
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
        return (
          <Badge variant="secondary" className="rounded-none">
            PENDING REVIEW
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="default" className="bg-emerald-500 rounded-none">
            APPROVED
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="destructive" className="rounded-none">
            REJECTED
          </Badge>
        );
    }
  };

  return (
    <ManagementPageLayout
      title="Appeal Management"
      description="Process user requests to lift bans and suspensions."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Search username or email..."
          className="w-64 rounded-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="rounded-none border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-75">User</TableHead>
              <TableHead>Sanction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
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
                  Error loading appeals.
                </TableCell>
              </TableRow>
            ) : appeals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground italic"
                >
                  No appeals found.
                </TableCell>
              </TableRow>
            ) : (
              appeals.map((appeal) => (
                <TableRow key={appeal.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Link
                      href={`/profile/${appeal.user.username}`}
                      className="flex items-center gap-3 group max-w-70"
                    >
                      <Avatar className="rounded-none">
                        <AvatarImage
                          src={appeal.user.profileImage ?? undefined}
                        />
                        <AvatarFallback className="rounded-none">
                          {appeal.user.username.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <p className="font-bold group-hover:underline truncate">
                          @{appeal.user.username}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate ">
                          {appeal.user.email}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className=" text-[10px]  rounded-none"
                    >
                      {appeal.sanction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(appeal.status)}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {format(new Date(appeal.createdAt), "PP")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-none font-bold"
                      onClick={() => setSelectedAppeal(appeal)}
                    >
                      {appeal.status === "PENDING"
                        ? "Review Case"
                        : "View Receipt"}
                    </Button>
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

      <ReviewAppealModal
        appeal={selectedAppeal}
        isOpen={!!selectedAppeal}
        onClose={() => setSelectedAppeal(null)}
      />
    </ManagementPageLayout>
  );
}
