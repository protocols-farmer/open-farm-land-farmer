// src/components/pages/opportunities/OpportunityForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import {
  opportunitySchema,
  OpportunityFormValues,
} from "@/lib/schemas/opportunity.schemas";
import {
  useCreateOpportunityMutation,
  useUpdateOpportunityMutation,
} from "@/lib/features/opportunities/opportunityApiSlice";
import {
  OpportunityDto,
  OpportunityTypeEnum,
} from "@/lib/features/opportunities/opportunityTypes";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import {
  Loader2,
  PlusCircle,
  Save,
  AlertCircle,
  UploadCloud,
  X,
  Building2,
} from "lucide-react";
import { getApiErrorMessage, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import ReactHashTags from "../posts/ReactHashTags";

const opportunityTypes: OpportunityTypeEnum[] = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
];

interface OpportunityFormProps {
  existingOpportunity?: OpportunityDto;
}

const stringToArray = (str: string | undefined): string[] => {
  if (!str) return [];
  return str
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export default function OpportunityForm({
  existingOpportunity,
}: OpportunityFormProps) {
  const router = useRouter();
  const [createOpportunity, { isLoading: isCreating }] =
    useCreateOpportunityMutation();
  const [updateOpportunity, { isLoading: isUpdating }] =
    useUpdateOpportunityMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(
    existingOpportunity?.companyLogo || null,
  );

  const isEditMode = !!existingOpportunity;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: existingOpportunity?.title || "",
      companyName: existingOpportunity?.companyName || "",
      location: existingOpportunity?.location || "",
      type: (existingOpportunity?.type as OpportunityTypeEnum) || undefined,
      isRemote: existingOpportunity?.isRemote ?? false,
      salaryRange: existingOpportunity?.salaryRange || "",
      applyUrl: existingOpportunity?.applyUrl || "",
      fullDescription: existingOpportunity?.fullDescription || "",
      responsibilities: existingOpportunity?.responsibilities?.join(", ") || "",
      qualifications: existingOpportunity?.qualifications?.join(", ") || "",
      tags: existingOpportunity?.tags.map((t) => t.tag.name) || [],
      companyLogo: undefined,
    },
  });

  // Real-time character counters
  const watchedTitle = watch("title") || "";
  const watchedDesc = watch("fullDescription") || "";
  const watchedResp = watch("responsibilities") || "";
  const watchedQual = watch("qualifications") || "";

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("companyLogo", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<OpportunityFormValues> = async (data) => {
    setFormError(null);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("companyName", data.companyName);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("isRemote", String(data.isRemote));
    formData.append("salaryRange", data.salaryRange || "");
    formData.append("applyUrl", data.applyUrl);
    formData.append("fullDescription", data.fullDescription);
    formData.append(
      "responsibilities",
      JSON.stringify(stringToArray(data.responsibilities)),
    );
    formData.append(
      "qualifications",
      JSON.stringify(stringToArray(data.qualifications)),
    );
    formData.append("tags", JSON.stringify(data.tags));

    if (data.companyLogo instanceof File) {
      formData.append("companyLogo", data.companyLogo);
    } else if (isEditMode && existingOpportunity?.companyLogo && logoPreview) {
      formData.append("retainedLogoUrl", existingOpportunity.companyLogo);
    }

    try {
      if (isEditMode) {
        await updateOpportunity({
          id: existingOpportunity.id,
          formData,
        }).unwrap();
        toast.success("Opportunity updated.");
        router.push(`/opportunities/${existingOpportunity.id}`);
      } else {
        const newOpportunity = await createOpportunity(formData).unwrap();
        toast.success("Opportunity published.");
        router.push(`/opportunities/${newOpportunity.id}`);
      }
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="space-y-8 p-0">
          {formError && (
            <Alert variant="destructive" className="rounded-none border-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Submission Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="space-y-2 shrink-0">
                <Label className="flex items-center gap-1 font-bold">
                  Company logo{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </Label>
                <div className="relative group w-32 h-32 border-3 border-double border-border flex items-center justify-center bg-card hover:border-primary transition-colors">
                  {logoPreview ? (
                    <>
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        fill
                        className="object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setValue("companyLogo", undefined);
                          setLogoPreview(null);
                        }}
                        className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <UploadCloud className="h-6 w-6 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground mt-2 uppercase font-black">
                        Upload
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={onLogoChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <Label htmlFor="title" className="font-bold">
                      Opportunity title{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <span
                      className={cn(
                        "text-[10px] font-mono",
                        watchedTitle.length > 100
                          ? "text-destructive"
                          : "text-muted-foreground",
                      )}
                    >
                      {watchedTitle.length}/100
                    </span>
                  </div>
                  <Input
                    id="title"
                    className="rounded-none border-2"
                    placeholder="e.g., Lead Systems Architect"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-[10px] text-destructive font-bold">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="font-bold">
                    Company name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      className="pl-9 rounded-none border-2"
                      placeholder="e.g., Open Farm Land"
                      {...register("companyName")}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-[10px] text-destructive font-bold">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="border-2 border-double" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="font-bold">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                className="rounded-none border-2"
                placeholder="e.g., Global / Remote"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.location.message}
                </p>
              )}
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="font-bold">
                    Employment type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="rounded-none border-2">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.replace("_", " ").toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-[10px] text-destructive font-bold">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <Label htmlFor="salaryRange" className="font-bold">
                  Compensation{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </Label>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {watch("salaryRange")?.length || 0}/50
                </span>
              </div>
              <Input
                id="salaryRange"
                className="rounded-none border-2"
                placeholder="e.g., $140k - $180k"
                {...register("salaryRange")}
              />
            </div>

            <div className="flex items-center gap-2 pt-8">
              <Controller
                name="isRemote"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isRemote"
                    className="rounded-none border-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="isRemote"
                className="font-black cursor-pointer uppercase text-xs tracking-widest"
              >
                Fully Remote Enabled
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applyUrl" className="font-bold">
              HTTPS Application URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="applyUrl"
              className="rounded-none border-2"
              placeholder="https://..."
              {...register("applyUrl")}
            />
            {errors.applyUrl && (
              <p className="text-[10px] text-destructive font-bold">
                {errors.applyUrl.message}
              </p>
            )}
          </div>

          <Separator className="border-2 border-double" />

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <Label className="font-bold">
                  Role description <span className="text-destructive">*</span>
                </Label>
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    watchedDesc.length > 3000
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {watchedDesc.length}/3000
                </span>
              </div>
              <Textarea
                id="fullDescription"
                className="rounded-none border-2 min-h-64"
                placeholder="Deep dive into the position..."
                {...register("fullDescription")}
              />
              {errors.fullDescription && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.fullDescription.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-bold">
                Technical tags <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <ReactHashTags
                    onChange={field.onChange}
                    initialTags={field.value}
                  />
                )}
              />
              {errors.tags && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.tags.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <Label htmlFor="responsibilities" className="font-bold">
                    Responsibilities{" "}
                    <span className="text-[10px] text-muted-foreground font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {watchedResp.length}/1000
                  </span>
                </div>
                <Textarea
                  id="responsibilities"
                  className="rounded-none border-2 h-40"
                  placeholder="CSV: Item 1, Item 2..."
                  {...register("responsibilities")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <Label htmlFor="qualifications" className="font-bold">
                    Qualifications{" "}
                    <span className="text-[10px] text-muted-foreground font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {watchedQual.length}/1000
                  </span>
                </div>
                <Textarea
                  id="qualifications"
                  className="rounded-none border-2 h-40"
                  placeholder="CSV: Item 1, Item 2..."
                  {...register("qualifications")}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-10">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full font-black uppercase h-16 bg-primary text-primary-foreground border-3 border-double rounded-none hover:bg-primary/90 transition-all"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isEditMode ? (
              <Save className="mr-2 h-5 w-5" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            {isEditMode ? "Update Opportunity" : "Broadcast Opportunity"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
