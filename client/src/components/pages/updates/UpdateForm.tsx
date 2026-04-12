"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Remarkable } from "remarkable";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";

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
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  PlusCircle,
  Save,
  AlertCircle,
  Eye,
  Edit3,
  Terminal,
  History,
} from "lucide-react";
import { getApiErrorMessage, cn } from "@/lib/utils";

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

  const watchedTitle = watch("title") || "";
  const watchedContent = watch("content") || "";
  const watchedVersion = watch("version") || "";

  const renderedPreview = useMemo(() => {
    if (!watchedContent)
      return "<p class='text-muted-foreground italic font-bold text-xs'>Waiting for log input...</p>";
    const rawHtml = md.render(watchedContent);
    return DOMPurify.sanitize(rawHtml);
  }, [watchedContent]);

  const onSubmit: SubmitHandler<CreateUpdateFormValues> = async (data) => {
    setFormError(null);
    try {
      if (isEditMode) {
        await updateUpdate({ id: existingUpdate.id, ...data }).unwrap();
        toast.success("System log updated.");
        router.push(`/updates/${existingUpdate.id}`);
      } else {
        const result = await createUpdate(data).unwrap();
        toast.success("New update broadcasted.");
        // FIX: result is already the UpdateDto because of transformResponse in ApiSlice
        router.push(`/updates/${result.id}`);
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
            <Alert
              variant="destructive"
              className="rounded-none border-3 border-double"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Transmission Error</AlertTitle>
              <AlertDescription className="font-medium">
                {formError}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <Label htmlFor="title" className="font-bold text-sm">
                Log Title <span className="text-destructive">*</span>
              </Label>
              <span
                className={cn(
                  "text-[10px] font-mono font-bold",
                  watchedTitle.length > 150
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {watchedTitle.length}/150
              </span>
            </div>
            <Input
              id="title"
              placeholder="Enter title..."
              className="h-14 rounded-none border-2  focus-visible:ring-primary font-bold"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-[10px] text-destructive font-bold italic">
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
                  <Label className="font-bold text-sm">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-12 rounded-none border-2  font-bold">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-2 ">
                      {updateCategories.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="font-bold text-xs"
                        >
                          {cat.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-[10px] text-destructive font-bold italic">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <Label htmlFor="version" className="font-bold text-sm">
                  Version{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </Label>
                <span className="text-[10px] font-mono font-bold text-muted-foreground">
                  {watchedVersion.length}/20
                </span>
              </div>
              <div className="relative">
                <History className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="version"
                  placeholder="v1.0.0"
                  className="h-12 pl-10 rounded-none border-2  font-mono font-bold"
                  {...register("version")}
                />
              </div>
            </div>
          </div>

          <Separator className="border-2 border-double /20" />

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-dashed /20 pb-3">
              <Label className="text-xs font-bold text-primary flex items-center gap-2">
                Main Content <span className="text-destructive">*</span>
              </Label>
              <div className="flex bg-muted p-1 border-2 border-double ">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold transition-all rounded-none",
                    activeTab === "write"
                      ? "bg-primary text-primary-foreground"
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
                    "flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold transition-all rounded-none",
                    activeTab === "preview"
                      ? "bg-primary text-primary-foreground"
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
                <div className="flex justify-end">
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold",
                      watchedContent.length > 5000
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {watchedContent.length}/5000
                  </span>
                </div>
                <Textarea
                  id="content"
                  placeholder="Describe the structural logs..."
                  rows={15}
                  className="rounded-none border-3  resize-none font-mono text-sm  focus-visible:ring-primary/20 p-6"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-[10px] text-destructive font-bold italic">
                    {errors.content.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="min-h-95 p-8 border-3 border-double  bg-background">
                <div
                  className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-bold"
                  dangerouslySetInnerHTML={{ __html: renderedPreview }}
                />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-10">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full font-bold h-16  border-3 border-double  rounded-none "
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isEditMode ? (
              <Save className="mr-2 h-5 w-5" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            {isEditMode ? "Update an Update" : "Create an Update "}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
