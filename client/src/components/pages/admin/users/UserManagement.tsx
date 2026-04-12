"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAdminUsersQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} from "@/lib/features/admin/adminApiSlice";
import {
  AdminUserRow,
  SystemRole,
  UserStatus,
} from "@/lib/features/admin/adminTypes";
import {
  updateUserStatusSchema,
  UpdateUserStatusValues,
} from "@/lib/schemas/admin.schemas";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Trash2,
  Ban,
  CheckCircle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import ManagementPageLayout from "../layouts/ManagementPageLayout";
import PaginationControls from "@/components/shared/PaginationControls";
import Link from "next/link";

function UserActions({ user }: { user: AdminUserRow }) {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateUserStatusMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModModalOpen, setIsModModalOpen] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);

  // 🚜 Initialize React Hook Form with Zod Schema
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateUserStatusValues>({
    resolver: zodResolver(updateUserStatusSchema),
    defaultValues: {
      status: UserStatus.SUSPENDED,
      reason: "",
      expiresAt: "",
    },
  });

  const selectedStatus = watch("status");
  const reasonText = watch("reason") || "";

  // 🚜 Logic: Only show Reason/Expiry for Sanctions (Suspended or Banned)
  const isSanction =
    selectedStatus === UserStatus.SUSPENDED ||
    selectedStatus === UserStatus.BANNED;

  const onModerateSubmit = async (values: UpdateUserStatusValues) => {
    try {
      let finalExpiresAt = values.expiresAt;
      if (values.status === UserStatus.SUSPENDED && values.expiresAt) {
        finalExpiresAt = new Date(values.expiresAt).toISOString();
      }

      await updateStatus({
        userId: user.id,
        status: values.status,
        reason: values.reason,
        expiresAt: values.status === UserStatus.BANNED ? null : finalExpiresAt,
      }).unwrap();

      toast.success(
        `User @${user.username} status updated to ${values.status.toLowerCase()}.`,
      );
      setIsModModalOpen(false);
      reset();
    } catch (error) {
      toast.error("Failed to update user status.");
    }
  };

  const handleDelete = async () => {
    if (currentUser?.id === user.id) {
      toast.error("You cannot delete your own account.");
      return;
    }
    try {
      await deleteUser(user.id).unwrap();
      toast.success(`User @${user.username} has been deleted.`);
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleRestoreAccess = async () => {
    try {
      await updateStatus({
        userId: user.id,
        status: UserStatus.ACTIVE,
      }).unwrap();
      toast.success(`Access restored for @${user.username}.`);
    } catch (error) {
      toast.error("Failed to restore access.");
    }
  };

  const isProtectedUser = user.systemRole === SystemRole.SUPER_ADMIN;
  const isDisciplined =
    user.status === UserStatus.BANNED || user.status === UserStatus.SUSPENDED;

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
          <DropdownMenuItem
            onClick={() =>
              isDisciplined ? handleRestoreAccess() : setIsModModalOpen(true)
            }
            disabled={
              isUpdatingStatus || currentUser?.id === user.id || isProtectedUser
            }
            className="cursor-pointer"
          >
            {isDisciplined ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Restore Access</span>
              </>
            ) : (
              <>
                <Ban className="mr-2 h-4 w-4 text-orange-500" />
                <span>Moderate User</span>
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={() => setIsAlertOpen(true)}
            disabled={
              isDeleting || currentUser?.id === user.id || isProtectedUser
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Moderation Modal */}
      <AlertDialog open={isModModalOpen} onOpenChange={setIsModModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Moderate User: @{user.username}</AlertDialogTitle>
            <AlertDialogDescription>
              Select the sanction type. A reason is mandatory for bans and
              suspensions.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form
            onSubmit={handleSubmit(onModerateSubmit)}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Action Type</label>
              <Select
                onValueChange={(val) => setValue("status", val as UserStatus)}
                defaultValue={UserStatus.SUSPENDED}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserStatus.SUSPENDED}>
                    Temporary Suspension
                  </SelectItem>
                  <SelectItem value={UserStatus.BANNED}>
                    Permanent Ban
                  </SelectItem>
                  <SelectItem value={UserStatus.DEACTIVATED}>
                    Deactivate Account
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 🚜 Conditional Reason Visibility & xyz/500 Counter */}
            {isSanction && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {selectedStatus === UserStatus.SUSPENDED && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Expiration Date & Time
                    </label>
                    <Input
                      type="datetime-local"
                      {...register("expiresAt")}
                      className="w-full"
                    />
                    {errors.expiresAt && (
                      <p className="text-xs text-destructive">
                        {errors.expiresAt.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Reason for Sanction
                    </label>
                    <span
                      className={`text-[10px] font-mono ${reasonText.length > 500 ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {reasonText.length}/500
                    </span>
                  </div>
                  <Textarea
                    placeholder="Provide technical justification..."
                    {...register("reason")}
                    className="min-h-[100px] resize-none"
                  />
                  {errors.reason && (
                    <p className="text-xs text-destructive">
                      {errors.reason.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <AlertDialogFooter className="pt-4">
              <AlertDialogCancel
                onClick={() => {
                  setIsModModalOpen(false);
                  reset();
                }}
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                variant="destructive"
                disabled={isUpdatingStatus}
              >
                {isUpdatingStatus ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Confirm Action"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Modal */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete{" "}
              <span className="font-bold">@{user.username}</span>? This cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Yes, delete user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useGetAdminUsersQuery({
    page,
    q: debouncedSearchTerm,
  });

  const users = data?.data.users ?? [];
  const pagination = data?.data.pagination;

  return (
    <ManagementPageLayout
      title="User Management"
      description="View, search, and take action on user accounts."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Search by name, username, email..."
          className="w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead>Role & Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-destructive"
                >
                  Failed to load users.
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link
                      href={`/profile/${user.username}`}
                      className="flex items-center gap-3 group max-w-[230px]"
                    >
                      <Avatar>
                        <AvatarImage src={user.profileImage ?? undefined} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <p className="font-medium group-hover:underline truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          @{user.username}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  {/* 🚜 Horizontal Scroll Fix: truncate long emails */}
                  <TableCell className="max-w-[200px] truncate font-mono text-xs">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 w-fit">
                      <Badge
                        variant={
                          user.systemRole === "SUPER_ADMIN"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {user.systemRole}
                      </Badge>
                      {user.status !== UserStatus.ACTIVE && (
                        <Badge
                          variant={
                            user.status === UserStatus.BANNED
                              ? "destructive"
                              : "outline"
                          }
                          className="text-[10px] py-0 mt-0.5"
                        >
                          {user.status}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(user.joinedAt), "PP")}
                  </TableCell>
                  <TableCell>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">
                      {user.postsCount} Posts
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">
                      {user.commentsCount} Comments
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <UserActions user={user} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <PaginationControls pagination={pagination} onPageChange={setPage} />
      )}
    </ManagementPageLayout>
  );
}
