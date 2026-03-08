"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

// --- HOOKS & API ---
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

// --- UI COMPONENTS ---
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

// --- CUSTOM COMPONENTS & UTILS ---
import {
  Loader2,
  PlusCircle,
  Save,
  AlertCircle,
  UploadCloud,
  X,
  Building2,
} from "lucide-react";
import { getApiErrorMessage } from "@/lib/utils";
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

/**
 * Helper to convert comma-separated strings to arrays for the backend
 */
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: existingOpportunity?.title || "",
      companyName: existingOpportunity?.companyName || "",
      location: existingOpportunity?.location || "",
      type: existingOpportunity?.type || undefined,
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

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("companyLogo", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setValue("companyLogo", undefined);
    setLogoPreview(null);
  };

  const onSubmit = async (data: OpportunityFormValues) => {
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
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="space-y-2 shrink-0">
                <Label>Company logo</Label>
                <div className="relative group w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-card hover:border-primary/50 transition-colors">
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
                        onClick={removeLogo}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <UploadCloud className="h-8 w-8 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-tighter">
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
                  <Label htmlFor="title">Opportunity title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior fullstack engineer"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      className="pl-9"
                      placeholder="e.g., Open Farm Land"
                      {...register("companyName")}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-xs text-destructive">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Work location</Label>
              <Input
                id="location"
                placeholder="e.g., Remote"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-xs text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Employment type</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
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
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="salaryRange">Compensation</Label>
              <Input
                id="salaryRange"
                placeholder="e.g., $120k - $150k"
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
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isRemote" className="font-medium cursor-pointer">
                This is a fully remote position
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applyUrl">Application link (HTTPS)</Label>
            <Input
              id="applyUrl"
              placeholder="https://company.com/apply"
              {...register("applyUrl")}
            />
            {errors.applyUrl && (
              <p className="text-xs text-destructive">
                {errors.applyUrl.message}
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                id="fullDescription"
                placeholder="Describe the role..."
                rows={8}
                {...register("fullDescription")}
              />
              {errors.fullDescription && (
                <p className="text-xs text-destructive">
                  {errors.fullDescription.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Required skills / tags</Label>
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
                <p className="text-xs text-destructive">
                  {errors.tags.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="Separate by commas"
                  {...register("responsibilities")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">
                  Ideal candidate qualifications
                </Label>
                <Textarea
                  id="qualifications"
                  placeholder="Separate by commas"
                  {...register("qualifications")}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-6">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full font-black uppercase tracking-tighter h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isEditMode ? (
              <Save className="mr-2 h-5 w-5" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            {isEditMode ? "Update opportunity" : "Publish opportunity"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
