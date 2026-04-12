"use client";

import React, { useState, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectUpdateSchema,
  updateProjectUpdateSchema,
  CreateProjectUpdateValues,
  UpdateProjectUpdateValues,
} from "@/lib/schemas/projectUpdate.schemas";

import {
  ProjectUpdateDto,
  projectUpdateCategories,
} from "@/lib/features/projectUpdate/projectUpdateTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ImageIcon, X, Eye } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

// Define a local type to track the removal flag in the form state
type ProjectFormValues = (
  | CreateProjectUpdateValues
  | UpdateProjectUpdateValues
) & {
  removeImage?: string;
};

interface ProjectUpdateFormProps {
  mode: "create" | "edit";
  initialData?: ProjectUpdateDto;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function ProjectUpdateForm({
  mode,
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}: ProjectUpdateFormProps) {
  const currentSchema =
    mode === "create" ? createProjectUpdateSchema : updateProjectUpdateSchema;
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(currentSchema as any) as Resolver<ProjectFormValues>,
    defaultValues: {
      version: initialData?.version || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      date: initialData
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      category: initialData?.category || "FEATURE",
      image: undefined,
      removeImage: "false",
    },
  });

  // Watchers for real-time counters
  const versionWatch = form.watch("version") || "";
  const titleWatch = form.watch("title") || "";
  const descWatch = form.watch("description") || "";

  // Sync image preview and form state when initialData changes
  useEffect(() => {
    if (initialData) {
      setImagePreview(initialData.imageUrl || null);
      form.reset({
        version: initialData.version || "",
        title: initialData.title || "",
        description: initialData.description || "",
        date: new Date(initialData.date).toISOString().split("T")[0],
        category: initialData.category,
        image: undefined,
        removeImage: "false",
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: ProjectFormValues) => {
    const formData = new FormData();

    // Append text fields
    formData.append("version", values.version || "");
    formData.append("title", values.title || "");
    formData.append("description", values.description || "");
    formData.append("date", values.date || "");
    formData.append("category", values.category || "");

    // Handle Image Removal flag
    if (values.removeImage === "true") {
      formData.append("removeImage", "true");
    }

    // Handle New Image File
    const imageFile = values.image?.[0];
    if (imageFile instanceof File) {
      formData.append("image", imageFile);
    }

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Version Field */}
          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest">
                    Version{" "}
                    <span className="text-destructive font-bold">*</span>
                  </FormLabel>
                  <span
                    className={cn(
                      "text-[9px] font-bold",
                      versionWatch.length > 45
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {versionWatch.length} / 50
                  </span>
                </div>
                <FormControl>
                  <Input
                    placeholder="e.g., v1.2.0"
                    {...field}
                    className="rounded-none border-2"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest">
                  Log Date <span className="text-destructive font-bold">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="rounded-none border-2"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />
        </div>

        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest">
                  Headline <span className="text-destructive font-bold">*</span>
                </FormLabel>
                <span
                  className={cn(
                    "text-[9px] font-bold",
                    titleWatch.length > 240
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {titleWatch.length} / 255
                </span>
              </div>
              <FormControl>
                <Input
                  placeholder="What's the main update?"
                  {...field}
                  className="rounded-none border-2"
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold" />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest">
                  Technical details{" "}
                  <span className="text-destructive font-bold">*</span>
                </FormLabel>
                <span
                  className={cn(
                    "text-[9px] font-bold",
                    descWatch.length > 1900
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {descWatch.length.toLocaleString()} / 2,000
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Describe the milestone or changes..."
                  className="min-h-30 rounded-none border-2"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest">
                  Update Type{" "}
                  <span className="text-destructive font-bold">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-none border-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    {projectUpdateCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          {/* Image Upload Area */}
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon className="h-3 w-3" /> Visual Proof (Optional)
                </FormLabel>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="relative group aspect-video w-full border-[3px] border-double border-primary/40 bg-muted overflow-hidden">
                      <NextImage
                        src={imagePreview}
                        alt="Update Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="text-white h-6 w-6" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <FormControl>
                      <div className="relative flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files?.length) {
                              onChange(files);
                              setImagePreview(URL.createObjectURL(files[0]));
                              form.setValue("removeImage", "false");
                            }
                          }}
                          className="hidden"
                          id="update-image-upload"
                          {...rest}
                        />
                        <label
                          htmlFor="update-image-upload"
                          className="flex items-center justify-center h-10 px-4 border-2 border-dashed cursor-pointer hover:bg-muted transition-colors text-[10px] font-black uppercase tracking-widest w-full"
                        >
                          {imagePreview ? "Replace Plot" : "Upload Plot"}
                        </label>
                      </div>
                    </FormControl>
                    {imagePreview && (
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          form.setValue("image", undefined);
                          form.setValue("removeImage", "true");
                        }}
                        className="rounded-none border-2 h-10 w-10 text-destructive border-destructive/20 hover:bg-destructive/5"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-dashed">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-none font-bold text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-none font-black text-[10px] uppercase tracking-widest px-8 h-11"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : mode === "create" ? (
              "Append Record"
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
