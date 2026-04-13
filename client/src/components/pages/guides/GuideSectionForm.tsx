//src/components/pages/guides/GuideSectionForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGuideSectionSchema,
  updateGuideSectionSchema,
  CreateGuideSectionValues,
} from "@/lib/schemas/guide.schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ImageIcon, X, Video, Eye } from "lucide-react";
import RichTextEditor from "../posts/RichTextEditor";
import { cn } from "@/lib/utils";
import NextImage from "next/image";

type SectionFormValues = CreateGuideSectionValues & {
  removeImage?: string;
};

interface GuideSectionFormProps {
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
  onCancel?: () => void; // Optional now as we use router.back() by default
}

export default function GuideSectionForm({
  mode,
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}: GuideSectionFormProps) {
  const router = useRouter();
  const currentSchema =
    mode === "create" ? createGuideSectionSchema : updateGuideSectionSchema;
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(currentSchema as any) as Resolver<SectionFormValues>,
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      order: initialData?.order || 1,
      videoUrl: initialData?.videoUrl || "",
      image: undefined,
      removeImage: "false",
    },
  });

  useEffect(() => {
    if (initialData) {
      const existingUrl = initialData.imageUrl || null;
      setImagePreview(existingUrl);

      form.reset({
        title: initialData.title || "",
        content: initialData.content || "",
        order: initialData.order || 1,
        videoUrl: initialData.videoUrl || "",
        image: undefined,
        removeImage: "false",
      });
    }
  }, [initialData, form]);

  const titleWatch = form.watch("title") || "";
  const contentWatch = form.watch("content") || "";

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleFormSubmit = (values: SectionFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title || "");
    formData.append("content", values.content);
    formData.append("order", String(values.order));
    formData.append("videoUrl", values.videoUrl || "");

    if (values.removeImage === "true") {
      formData.append("removeImage", "true");
    }

    const file =
      values.image instanceof FileList ? values.image[0] : values.image;
    if (file instanceof File) {
      formData.append("image", file);
    }

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-6"
      >
        {/* --- HEADER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-[10px] font-black ">
                    Section Heading
                  </FormLabel>
                  <span
                    className={cn(
                      "text-[9px] font-bold",
                      titleWatch.length > 140
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {titleWatch.length} / 150
                  </span>
                </div>

                <FormControl>
                  <Input
                    placeholder="Optional heading..."
                    {...field}
                    className="rounded-none border-2 focus-visible:ring-0"
                  />
                </FormControl>

                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black ">
                  Order *
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    className="rounded-none border-2 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />
        </div>

        {/* --- MULTIMEDIA GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black  flex items-center gap-2">
                  <Video className="h-3 w-3 text-primary" /> Video URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="YouTube/Vimeo link..."
                    {...field}
                    className="rounded-none border-2 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black  flex items-center gap-2">
                  <ImageIcon className="h-3 w-3 text-primary" /> Technical Plot
                </FormLabel>

                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative group aspect-video w-full border-[3px] border-double border-primary/40 bg-muted overflow-hidden">
                      <NextImage
                        src={imagePreview}
                        alt="Plot Preview"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
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
                          id="section-image-upload"
                          {...rest}
                        />
                        <label
                          htmlFor="section-image-upload"
                          className="flex items-center justify-center h-10 px-4 border-2 border-dashed cursor-pointer hover:bg-muted transition-colors text-[10px] font-black "
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

        {/* --- CONTENT AREA --- */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex justify-between items-center">
                <FormLabel className="text-[10px] font-black ">
                  Technical Data (Required)
                </FormLabel>
                <span
                  className={cn(
                    "text-[9px] font-bold",
                    contentWatch.length > 19500
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {contentWatch.length.toLocaleString()} / 20,000
                </span>
              </div>
              <FormControl>
                <div className="border-2 p-1 bg-muted/5 h-113 overflow-y-auto focus-within:border-primary transition-colors custom-scrollbar">
                  <RichTextEditor
                    initialContent={field.value}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-[10px] font-bold" />
            </FormItem>
          )}
        />

        <div className="sticky -bottom-6 bg-card flex justify-end gap-3 pt-6 pb-2 border-t border-dashed mt-6 z-10">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="rounded-none font-bold text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-none font-black text-[10px] px-8 h-11"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Append Segment" : "Update Segment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
