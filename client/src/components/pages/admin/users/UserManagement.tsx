//src/components/pages/admin/users/UserManagement.tsx
"use client";

import React, { useState } from "react";
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
import { MoreHorizontal, Trash2, Ban, CheckCircle } from "lucide-react";
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
  const currentUser = useAppSelector(selectCurrentUser);

  // 🚜 Moderation Modal State
  const [isModModalOpen, setIsModModalOpen] = useState(false);
  const [modAction, setModAction] = useState<
    UserStatus.SUSPENDED | UserStatus.BANNED
  >(UserStatus.SUSPENDED);

  // 🚜 Replaced modDuration with precise datetime state
  const [modExpiresAt, setModExpiresAt] = useState("");
  const [modReason, setModReason] = useState("");

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

  const handleModerateSubmit = async () => {
    if (!modReason.trim()) {
      toast.error("A reason is required.");
      return;
    }

    let expiresAt: string | null = null;
    if (modAction === UserStatus.SUSPENDED) {
      if (!modExpiresAt) {
        toast.error("Please select an expiration date and time.");
        return;
      }
      // Convert the local datetime input to a standard ISO string for the database
      expiresAt = new Date(modExpiresAt).toISOString();
    }

    try {
      await updateStatus({
        userId: user.id,
        status: modAction,
        reason: modReason,
        expiresAt,
      }).unwrap();

      toast.success(
        `User @${user.username} has been ${modAction.toLowerCase()}.`,
      );
      setIsModModalOpen(false);
      setModReason("");
      setModExpiresAt(""); // Reset
    } catch (error) {
      toast.error("Failed to update user status.");
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

          {/* 🚜 Using Shadcn semantic destructive classes */}
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

      {/* Moderation Form Modal */}
      <AlertDialog open={isModModalOpen} onOpenChange={setIsModModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Moderate User: @{user.username}</AlertDialogTitle>
            <AlertDialogDescription>
              Specify the sanction type, duration, and the reason for this
              action. The user will see this reason.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Action Type
              </label>
              {/* 🚜 Replaced native select with Shadcn Select */}
              <Select
                value={modAction}
                onValueChange={(val) =>
                  setModAction(val as UserStatus.SUSPENDED | UserStatus.BANNED)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserStatus.SUSPENDED}>
                    Temporary Suspension
                  </SelectItem>
                  <SelectItem value={UserStatus.BANNED}>
                    Permanent Ban
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {modAction === UserStatus.SUSPENDED && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Expiration Date & Time
                </label>
                {/* 🚜 Precise datetime picker using Shadcn Input styling */}
                <Input
                  type="datetime-local"
                  value={modExpiresAt}
                  onChange={(e) => setModExpiresAt(e.target.value)}
                  min={new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60000,
                  )
                    .toISOString()
                    .slice(0, 16)}
                  className="w-full"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Reason (Required)
              </label>
              {/* 🚜 Replaced native textarea with Shadcn Textarea */}
              <Textarea
                placeholder="E.g., Repeated violation of community guidelines..."
                value={modReason}
                onChange={(e) => setModReason(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsModModalOpen(false);
                setModReason("");
                setModExpiresAt("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleModerateSubmit}
              disabled={
                isUpdatingStatus ||
                !modReason.trim() ||
                (modAction === UserStatus.SUSPENDED && !modExpiresAt)
              }
              variant="destructive"
            >
              {isUpdatingStatus ? "Applying..." : "Confirm Action"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Existing Delete Modal */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the account for{" "}
              <span className="font-bold">@{user.username}</span> and all their
              data.
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
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
                    className="flex items-center gap-3 group"
                  >
                    <Avatar>
                      <AvatarImage src={user.profileImage ?? undefined} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium group-hover:underline">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
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
                    {user.status === UserStatus.BANNED && (
                      <Badge
                        variant="destructive"
                        className="text-[10px] py-0 mt-0.5"
                      >
                        BANNED
                      </Badge>
                    )}
                    {user.status === UserStatus.SUSPENDED && (
                      <Badge
                        variant="outline"
                        className="text-[10px] py-0 mt-0.5 border-orange-500 text-orange-500"
                      >
                        SUSPENDED
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(user.joinedAt), "PP")}</TableCell>
                <TableCell>
                  <p className="text-xs">{user._count.posts} Posts</p>
                  <p className="text-xs">{user._count.comments} Comments</p>
                </TableCell>
                <TableCell className="text-right">
                  <UserActions user={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {pagination && (
        <PaginationControls pagination={pagination} onPageChange={setPage} />
      )}
    </ManagementPageLayout>
  );
}
