//src/components/pages/guides/GuideStepForm.tsx
"use client";

import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGuideStepSchema,
  updateGuideStepSchema,
  CreateGuideStepValues,
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
import { Loader2 } from "lucide-react";
import RichTextEditor from "../posts/RichTextEditor";
import { cn } from "@/lib/utils";

interface GuideStepFormProps {
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: (data: CreateGuideStepValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function GuideStepForm({
  mode,
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}: GuideStepFormProps) {
  const currentSchema =
    mode === "create" ? createGuideStepSchema : updateGuideStepSchema;

  const form = useForm<CreateGuideStepValues>({
    // We cast the resolver to bypass the optional/required mismatch between schemas
    resolver: zodResolver(currentSchema) as Resolver<CreateGuideStepValues>,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      order: initialData?.order || 1,
    },
  });

  const titleWatch = form.watch("title") || "";
  const descWatch = form.watch("description") || "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-[10px] font-black ">
                    Step Title{" "}
                    <span className="text-destructive font-bold">
                      (Required)
                    </span>
                  </FormLabel>
                  <span
                    className={cn(
                      "text-[9px] font-bold transition-colors",
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
                    placeholder="e.g., Phase 01: Setup"
                    {...field}
                    className="rounded-none border-2 focus-visible:ring-0 focus-visible:border-primary transition-colors"
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
                  Order <span className="text-destructive font-bold">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    className="rounded-none border-2 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-[10px] font-black ">
                  Technical Briefing
                </FormLabel>
                <span
                  className={cn(
                    "text-[9px] font-bold",
                    descWatch.length > 900
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {descWatch.length} / 1000
                </span>
              </div>
              <FormControl>
                <FormControl>
                  <div className="border-2 p-1 bg-muted/5 h-[450px] overflow-y-auto focus-within:border-primary transition-colors custom-scrollbar">
                    <RichTextEditor
                      initialContent={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormControl>
              <FormMessage className="text-[10px] font-bold" />
            </FormItem>
          )}
        />

        <div className="sticky -bottom-6 bg-card flex justify-end gap-3 pt-6 pb-2 border-t border-dashed mt-6 z-10">
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
            className="rounded-none font-black text-[10px] px-8 h-11"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Plant Step" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
