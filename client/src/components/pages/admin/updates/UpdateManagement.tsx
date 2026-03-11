//src/components/pages/admin/updates/UpdateManagement.tsx

"use client";

import React, { useState } from "react";
import {
  useGetAdminUpdatesQuery,
  useDeleteUpdateMutation,
} from "@/lib/features/admin/adminApiSlice";
import {
  AdminUpdateRow,
  UpdateCategory,
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
  Tag,
  Calendar,
  History,
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

const getCategoryStyles = (category: UpdateCategory) => {
  const styles: Record<UpdateCategory, string> = {
    [UpdateCategory.PLATFORM]:
      "bg-blue-500/10 text-blue-500 border-blue-500/20",
    [UpdateCategory.PROJECT]:
      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    [UpdateCategory.SECURITY]:
      "bg-destructive/10 text-destructive border-destructive/20 animate-pulse",
    [UpdateCategory.MAINTENANCE]:
      "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };
  return styles[category] || "bg-secondary text-secondary-foreground";
};

function UpdateActions({ update }: { update: AdminUpdateRow }) {
  const [deleteUpdate, { isLoading }] = useDeleteUpdateMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUpdate(update.id).unwrap();
      toast.success("Platform update deleted.");
    } catch {
      toast.error("Failed to delete the update.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/updates/${update.id}`}>
              <Eye className="mr-2 h-4 w-4" /> View Full Log
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-500/10"
            onClick={() => setIsAlertOpen(true)}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this update?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the update entry for{" "}
              <strong>{update.title}</strong>. Users will no longer see this in
              their history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : "Delete Entry"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function UpdateManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useGetAdminUpdatesQuery({
    page,
    q: debouncedSearch,
  });

  const updates = data?.data.updates ?? [];
  const pagination = data?.data.pagination;

  return (
    <ManagementPageLayout
      title="Platform Updates"
      description="Manage change logs, version releases, and security announcements."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Search by title or version..."
          className="w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[35%]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-muted-foreground italic"
                >
                  Loading change logs...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-destructive font-medium"
                >
                  Critical error fetching updates.
                </TableCell>
              </TableRow>
            ) : updates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-muted-foreground"
                >
                  No updates logged yet.
                </TableCell>
              </TableRow>
            ) : (
              updates.map((update) => (
                <TableRow
                  key={update.id}
                  className="group hover:bg-muted/40 transition-colors"
                >
                  <TableCell className="align-top">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-foreground line-clamp-1">
                        {update.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center">
                        <Tag className="mr-1 h-3 w-3" /> ID:{" "}
                        {update.id.slice(-8)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge
                      variant="outline"
                      className={getCategoryStyles(update.category)}
                    >
                      {update.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top">
                    {update.version ? (
                      <code className="text-[13px] font-mono font-bold bg-muted px-2 py-0.5 rounded text-primary border border-primary/10">
                        {update.version}
                      </code>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        N/A
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 ring-2 ring-background">
                        <AvatarImage
                          src={update.author.profileImage ?? undefined}
                        />
                        <AvatarFallback>
                          {update.author.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">
                          @{update.author.username}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Admin Staff
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1.5 h-3.5 w-3.5" />
                      {format(new Date(update.publishedAt), "PP")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right align-top">
                    <UpdateActions update={update} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="mt-6">
          <PaginationControls pagination={pagination} onPageChange={setPage} />
        </div>
      )}
    </ManagementPageLayout>
  );
}
