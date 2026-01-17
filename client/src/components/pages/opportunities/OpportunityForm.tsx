// src/components/pages/opportunities/OpportunityForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  CreateOpportunityPayload,
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
import { Loader2, PlusCircle, Save, AlertCircle } from "lucide-react";
import { getApiErrorMessage } from "@/lib/utils";
import toast from "react-hot-toast";

const opportunityTypes: OpportunityTypeEnum[] = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
];

interface OpportunityFormProps {
  existingOpportunity?: OpportunityDto;
}

// Helper function to convert a comma-separated string to a clean array
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

  const isEditMode = !!existingOpportunity;
  const isLoading = isCreating || isUpdating;

  // --- THIS IS THE FIX ---
  // We remove the generic <OpportunityFormValues> from useForm.
  // The resolver will now be the single source of truth for the form's type.
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: existingOpportunity?.title || "",
      companyName: existingOpportunity?.companyName || "",
      companyLogo: existingOpportunity?.companyLogo || "",
      location: existingOpportunity?.location || "",
      type: existingOpportunity?.type || undefined,
      isRemote: existingOpportunity?.isRemote || false,
      salaryRange: existingOpportunity?.salaryRange || "",
      applyUrl: existingOpportunity?.applyUrl || "",
      fullDescription: existingOpportunity?.fullDescription || "",
      responsibilities: existingOpportunity?.responsibilities?.join(", ") || "",
      qualifications: existingOpportunity?.qualifications?.join(", ") || "",
      tags: existingOpportunity?.tags.map((t) => t.tag.name).join(", ") || "",
    },
  });

  // The `data` parameter here will now be correctly typed as OpportunityFormValues
  // because it's inferred from the resolver.
  const onSubmit = async (data: OpportunityFormValues) => {
    setFormError(null);

    const payload: CreateOpportunityPayload = {
      ...data,
      responsibilities: stringToArray(data.responsibilities),
      qualifications: stringToArray(data.qualifications),
      tags: stringToArray(data.tags),
    };

    try {
      if (isEditMode) {
        await updateOpportunity({
          id: existingOpportunity.id,
          ...payload,
        }).unwrap();
        toast.success("Opportunity updated successfully!");
        router.push(`/opportunities/${existingOpportunity.id}`);
      } else {
        const newOpportunity = await createOpportunity(payload).unwrap();
        toast.success("Opportunity created successfully!");
        router.push(`/opportunities/${newOpportunity.id}`);
      }
    } catch (err) {
      setFormError(getApiErrorMessage(err as any));
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" {...register("title")} />
              <p className="text-sm text-destructive">
                {errors.title?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" {...register("companyName")} />
              <p className="text-sm text-destructive">
                {errors.companyName?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Company Logo URL</Label>
              <Input id="companyLogo" {...register("companyLogo")} />
              <p className="text-sm text-destructive">
                {errors.companyLogo?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
              <p className="text-sm text-destructive">
                {errors.location?.message}
              </p>
            </div>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-destructive">
                    {errors.type?.message}
                  </p>
                </div>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
              <Input id="salaryRange" {...register("salaryRange")} />
            </div>
            <Controller
              name="isRemote"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id="isRemote"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="isRemote">Remote work available</Label>
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="applyUrl">Application URL</Label>
            <Input id="applyUrl" {...register("applyUrl")} />
            <p className="text-sm text-destructive">
              {errors.applyUrl?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullDescription">
              Full Description (Markdown supported)
            </Label>
            <Textarea
              id="fullDescription"
              rows={10}
              {...register("fullDescription")}
            />
            <p className="text-sm text-destructive">
              {errors.fullDescription?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibilities">
              Responsibilities (comma-separated)
            </Label>
            <Input
              id="responsibilities"
              {...register("responsibilities")}
              placeholder="Plan projects, Write code, ..."
            />
            <p className="text-sm text-muted-foreground">
              Separate each item with a comma.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualifications">
              Qualifications (comma-separated)
            </Label>
            <Input
              id="qualifications"
              {...register("qualifications")}
              placeholder="React, Node.js, ..."
            />
            <p className="text-sm text-muted-foreground">
              Separate each item with a comma.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="Engineering, Frontend, ..."
            />
            <p className="text-sm text-muted-foreground">
              Separate each item with a comma.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isEditMode ? (
              <Save className="mr-2 h-5 w-5" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            {isEditMode ? "Save Changes" : "Publish Opportunity"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
