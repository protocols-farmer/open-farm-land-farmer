//src/components/pages/updates/UpdateForm.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Remarkable } from "remarkable";
import DOMPurify from "dompurify";

import {
  createUpdateSchema,
  CreateUpdateFormValues,
} from "@/lib/schemas/update.schemas";
import {
  useCreateUpdateMutation,
  useUpdateUpdateMutation,
} from "@/lib/features/updates/updateApiSlice";
import {
  UpdateDto,
  UpdateCategoryEnum,
} from "@/lib/features/updates/updateTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  PlusCircle,
  Save,
  AlertCircle,
  Eye,
  Edit3,
  Terminal,
} from "lucide-react";
import { getApiErrorMessage } from "@/lib/utils";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const updateCategories: UpdateCategoryEnum[] = [
  "APP_UPDATE",
  "MARKETING",
  "COMMUNITY",
];

const md = new Remarkable({ html: true, linkify: true, typographer: true });

interface UpdateFormProps {
  existingUpdate?: UpdateDto;
}

type TabState = "write" | "preview";

export default function UpdateForm({ existingUpdate }: UpdateFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabState>("write");
  const [createUpdate, { isLoading: isCreating }] = useCreateUpdateMutation();
  const [updateUpdate, { isLoading: isUpdating }] = useUpdateUpdateMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const isEditMode = !!existingUpdate;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateUpdateFormValues>({
    resolver: zodResolver(createUpdateSchema),
    defaultValues: {
      title: existingUpdate?.title || "",
      content: existingUpdate?.content || "",
      category: existingUpdate?.category || undefined,
      version: existingUpdate?.version || "",
    },
  });

  const contentValue = watch("content");

  // 🚜 Render Markdown for the Preview Tab
  const renderedPreview = useMemo(() => {
    if (!contentValue)
      return "<p className='text-muted-foreground italic'>Nothing to preview yet...</p>";
    const rawHtml = md.render(contentValue);
    return DOMPurify.sanitize(rawHtml);
  }, [contentValue]);

  const onSubmit = async (data: CreateUpdateFormValues) => {
    setFormError(null);
    try {
      if (isEditMode) {
        await updateUpdate({ id: existingUpdate.id, ...data }).unwrap();
        toast.success("System log updated.");
        router.push(`/updates/${existingUpdate.id}`);
      } else {
        const newUpdate = await createUpdate(data).unwrap();
        toast.success("New update published.");
        router.push(`/updates/${newUpdate.id}`);
      }
    } catch (err) {
      setFormError(getApiErrorMessage(err as any));
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent rounded-none">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="space-y-6 p-0">
          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Log title</Label>
            <Input
              id="title"
              placeholder="e.g., Major core infrastructure refinement"
              className="h-12 text-lg font-medium"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {updateCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.replace("_", " ").toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="version">Version (optional)</Label>
              <Input
                id="version"
                placeholder="e.g., 1.2.0-rc.1"
                className="h-12 font-mono"
                {...register("version")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Log content
              </Label>
              <div className="flex bg-muted p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                    activeTab === "write"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Edit3 className="h-3 w-3" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                    activeTab === "preview"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </button>
              </div>
            </div>

            {activeTab === "write" ? (
              <div className="space-y-2">
                <Textarea
                  id="content"
                  placeholder="Describe the structural changes harvested in this update..."
                  rows={15}
                  className="resize-none font-mono text-sm leading-relaxed focus-visible:ring-primary/20"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.content.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="min-h-[360px] p-6 rounded-md border border-dashed border-border bg-muted/5">
                <div
                  className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:font-black prose-headings:tracking-tighter"
                  dangerouslySetInnerHTML={{ __html: renderedPreview }}
                />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-6">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full font-black uppercase tracking-tighter h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isEditMode ? (
              <Save className="mr-2 h-5 w-5" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            {isEditMode ? "Save changes" : "Publish update"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
