//src/components/pages/projects/ProjectJourneyTab.tsx
"use client";

import React, { useState } from "react";
import { PostDto } from "@/lib/features/post/postTypes";
import {
  ProjectUpdateDto,
  ProjectUpdateCategory,
} from "@/lib/features/projectUpdate/projectUpdateTypes";
import {
  useAddProjectUpdateMutation,
  useDeleteProjectUpdateMutation,
  useUpdateProjectUpdateMutation,
} from "@/lib/features/projectUpdate/projectUpdateApiSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  PlusCircle,
  Trash,
  Edit,
  Lightbulb,
  Bug,
  Rocket,
  Wrench,
  FileText,
  Hammer,
  Book,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import ProjectUpdateForm from "./ProjectUpdateForm";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Helper to get a specific icon based on the update category
const getUpdateIcon = (category: ProjectUpdateCategory) => {
  const iconProps = { className: "h-6 w-6 text-primary" };
  switch (category) {
    case "FEATURE":
      return <Lightbulb {...iconProps} />;
    case "BUG_FIX":
      return <Bug {...iconProps} />;
    case "DEPLOYMENT":
      return <Rocket {...iconProps} />;
    case "REFACTOR":
      return <Wrench {...iconProps} />;
    case "DOCUMENTATION":
      return <Book {...iconProps} />;
    case "CHORE":
      return <Hammer {...iconProps} />;
    default:
      return <CheckCircle {...iconProps} />;
  }
};

interface ProjectJourneyTabProps {
  post: PostDto;
  isAuthor: boolean;
}

export default function ProjectJourneyTab({
  post,
  isAuthor,
}: ProjectJourneyTabProps) {
  // State to manage the Create/Edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State to hold the update being edited. If null, dialog is in "create" mode.
  const [editingUpdate, setEditingUpdate] = useState<ProjectUpdateDto | null>(
    null
  );

  // RTK Query mutation hooks
  const [addProjectUpdate, { isLoading: isAdding }] =
    useAddProjectUpdateMutation();
  const [updateProjectUpdate, { isLoading: isUpdating }] =
    useUpdateProjectUpdateMutation();
  const [deleteProjectUpdate] = useDeleteProjectUpdateMutation();

  const handleOpenCreateDialog = () => {
    setEditingUpdate(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (update: ProjectUpdateDto) => {
    setEditingUpdate(update);
    setIsDialogOpen(true);
  };

  // AFTER
  const handleDelete = async (updateId: string) => {
    // The confirmation is now handled by the AlertDialog component
    try {
      await deleteProjectUpdate({ updateId, postId: post.id }).unwrap();
      toast.success("Update deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete update.");
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    const mutationPromise = editingUpdate
      ? updateProjectUpdate({
          updateId: editingUpdate.id,
          postId: post.id,
          formData,
        }).unwrap()
      : addProjectUpdate({ postId: post.id, formData }).unwrap();

    try {
      await toast.promise(mutationPromise, {
        loading: editingUpdate ? "Saving changes..." : "Adding new update...",
        success: `Update ${editingUpdate ? "saved" : "added"} successfully!`,
        error: "An error occurred. Please try again.",
      });
      setIsDialogOpen(false);
      setEditingUpdate(null);
    } catch (err) {
      // Error toast is already handled by toast.promise
    }
  };

  return (
    <div className="space-y-8">
      {isAuthor && (
        <div className="text-center border-b pb-8">
          <Button onClick={handleOpenCreateDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Journey Update
          </Button>
        </div>
      )}

      {post.projectJourney && post.projectJourney.length > 0 ? (
        post.projectJourney.map((update) => (
          <Card key={update.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col items-center justify-center gap-2 p-4 text-center border-b md:border-r md:border-b-0 bg-accent/50 md:w-48">
                {getUpdateIcon(update.category)}
                <p className="font-bold text-lg">{update.version}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(update.date), "MMM dd, yyyy")}
                </p>
                <Badge variant="outline" className="capitalize bg-background">
                  {update.category.replace("_", " ").toLowerCase()}
                </Badge>
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl mb-2">{update.title}</CardTitle>
                  {isAuthor && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleOpenEditDialog(update)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            {/* This DropdownMenuItem now *triggers* the dialog instead of calling handleDelete */}
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()} // Prevents the dropdown from closing when the dialog opens
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>

                          {/* This is the content of the confirmation dialog */}
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this project update.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              {/* The action button now calls the handleDelete function */}
                              <AlertDialogAction
                                onClick={() => handleDelete(update.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Yes, Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <CardDescription>{update.description}</CardDescription>
                {update.imageUrl && (
                  <div className="mt-4 relative aspect-video w-full max-w-lg overflow-hidden rounded-lg border">
                    <Image
                      src={update.imageUrl}
                      alt={`Image for ${update.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center min-h-[30vh]">
          <FileText className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-6 text-xl font-semibold tracking-tight">
            No Journey Updates Yet
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            {isAuthor
              ? "Click the button above to add your first project update and document your progress!"
              : "The author hasn't added any journey updates for this project yet."}
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingUpdate ? "Edit" : "Add"} Project Update
            </DialogTitle>
            <DialogDescription>
              {editingUpdate
                ? "Modify the details of this journey entry."
                : "Log a new update for your project journey."}
            </DialogDescription>
          </DialogHeader>
          <ProjectUpdateForm
            mode={editingUpdate ? "edit" : "create"}
            initialData={editingUpdate ?? undefined}
            onSubmit={handleFormSubmit}
            isSubmitting={isAdding || isUpdating}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
