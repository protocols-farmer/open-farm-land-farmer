//src/components/pages/profile/ProfileForm.tsx
"use client";

import { cn, getApiErrorMessage } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useUpdateMyProfileMutation } from "@/lib/features/user/userApiSlice";
import { resetUploadState } from "@/lib/features/upload/uploadProgressSlice";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/lib/schemas/auth.schemas";
import { SanitizedUserDto } from "@/lib/features/user/userTypes";
import { dataURLtoFile } from "@/components/shared/dataURLtoFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Loader2,
  Save,
  CheckCircle,
  Info,
  ImageIcon,
} from "lucide-react";
import ImageCropper from "@/components/shared/ImageCropper";

interface ProfileFormProps {
  user: SanitizedUserDto;
  onFinishedEditing: () => void;
}

const getInitials = (name: string | null | undefined): string => {
  if (!name) return "?";
  const words = name.split(" ").filter(Boolean);
  return (
    (words[0]?.charAt(0) ?? "") +
    (words.length > 1 ? (words[words.length - 1]?.charAt(0) ?? "") : "")
  ).toUpperCase();
};

export default function ProfileForm({
  user,
  onFinishedEditing,
}: ProfileFormProps) {
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const [uiMessage, setUiMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const [bannerPreview, setBannerPreview] = useState<string | undefined>(
    user.bannerImage || undefined,
  );
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    user.profileImage || undefined,
  );
  const [croppingImage, setCroppingImage] = useState<{
    src: string;
    type: "profile" | "banner";
  } | null>(null);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const uploadState = useAppSelector((state) => state.uploadProgress);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      title: user.title || "",
      location: user.location || "",
      twitterUrl: user.twitterUrl || "",
      githubUrl: user.githubUrl || "",
      websiteUrl: user.websiteUrl || "",
    },
  });

  const nameChars = watch("name")?.length || 0;
  const userChars = watch("username")?.length || 0;
  const bioChars = watch("bio")?.length || 0;
  const titleChars = watch("title")?.length || 0;
  const locChars = watch("location")?.length || 0;

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(resetUploadState());
      const reader = new FileReader();
      reader.onload = () =>
        setCroppingImage({ src: reader.result as string, type });
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = "";
  };

  const handleCropComplete = async (croppedImageBase64: string) => {
    if (!croppingImage) return;
    const { type } = croppingImage;
    const croppedFile = dataURLtoFile(croppedImageBase64, `${type}.png`);
    if (!croppedFile) return;

    setUiMessage(null);
    const formData = new FormData();
    formData.append(
      type === "profile" ? "profileImage" : "bannerImage",
      croppedFile,
    );
    setCroppingImage(null);

    try {
      await updateProfile(formData).unwrap();
      const blobUrl = URL.createObjectURL(croppedFile);
      if (type === "profile") setAvatarPreview(blobUrl);
      else setBannerPreview(blobUrl);
      setUiMessage({
        type: "success",
        text: `${type === "profile" ? "Avatar" : "Banner"} updated!`,
      });
    } catch (err: any) {
      setUiMessage({
        type: "error",
        text: getApiErrorMessage(err, "Image upload failed."),
      });
    }
  };

  const onTextSubmit: SubmitHandler<UpdateProfileFormValues> = async (data) => {
    setUiMessage(null);
    const formData = new FormData();
    let hasChanges = false;

    (Object.keys(data) as Array<keyof UpdateProfileFormValues>).forEach(
      (key) => {
        const newValue = (data[key] as string)?.trim() || "";
        const oldValue = (user as any)[key] || "";

        if (newValue !== oldValue) {
          formData.append(key, newValue === "" ? "null" : newValue);
          hasChanges = true;
        }
      },
    );

    if (!hasChanges) {
      setUiMessage({ type: "info", text: "No changes detected." });
      return;
    }

    try {
      const response = await updateProfile(formData).unwrap();
      setUiMessage({
        type: "success",
        text: response.message || "Profile synchronized!",
      });
      setTimeout(() => onFinishedEditing(), 1500);
    } catch (err: any) {
      setUiMessage({
        type: "error",
        text: getApiErrorMessage(err, "Update failed."),
      });
    }
  };

  const CounterField = ({
    label,
    current,
    max,
  }: {
    label: string;
    current: number;
    max: number;
  }) => (
    <div className="flex justify-between items-center mb-1">
      <Label className="text-[10px] font-black uppercase tracking-widest">
        {label}
      </Label>
      <span
        className={cn(
          "text-[9px] font-bold",
          current > max ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {current} / {max}
      </span>
    </div>
  );

  return (
    <>
      <Card className="overflow-hidden border-none shadow-md rounded-none">
        <form onSubmit={handleSubmit(onTextSubmit)}>
          <div className="bg-muted/30 border-b-2 border-dashed pt-6 pb-6 px-6">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter text-foreground">
              Archive Update
            </CardTitle>
            <CardDescription className="text-xs font-bold uppercase tracking-tight">
              Synchronizing identity with the central guild records.
            </CardDescription>
          </div>

          <CardContent className="p-0 relative">
            <div className="relative aspect-[3/1] w-full bg-slate-900 group overflow-hidden border-b-2">
              {bannerPreview ? (
                <Image
                  src={bannerPreview}
                  alt="Banner"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-12 h-12 text-white/10" />
                </div>
              )}
              <div className="absolute bottom-4 right-4 z-20">
                <Button
                  type="button"
                  size="sm"
                  className="rounded-none shadow-lg border-2 border-background"
                  onClick={() => bannerInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  <span className="text-[10px] font-black uppercase">
                    Banner
                  </span>
                </Button>
              </div>
              <input
                type="file"
                ref={bannerInputRef}
                onChange={(e) => handleFileSelect(e, "banner")}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="px-8 relative -mt-16 mb-8">
              <div className="relative h-32 w-32 shrink-0 group">
                <Avatar className="h-full w-full border-4 border-background ring-2 ring-primary shadow-2xl rounded-none">
                  <AvatarImage
                    src={avatarPreview || undefined}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-black">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="rounded-none absolute bottom-0 right-0 h-10 w-10 border-4 border-background bg-primary hover:bg-primary/90 z-20"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Camera className="h-5 w-5 text-white" />
                </Button>
                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={(e) => handleFileSelect(e, "profile")}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </CardContent>

          <CardContent className="p-8 space-y-8">
            {uploadState.isUploading && (
              <div className="space-y-2 bg-primary/5 p-4 border border-primary/10">
                <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                  <span>Uploading {uploadState.fileName}...</span>
                  <span>{uploadState.progress}%</span>
                </div>
                <Progress
                  value={uploadState.progress}
                  className="h-1 rounded-none"
                />
              </div>
            )}

            {uiMessage && (
              <Alert
                variant={uiMessage.type === "error" ? "destructive" : "default"}
                className="rounded-none border-2 border-double"
              >
                <AlertDescription className="font-bold text-xs uppercase">
                  {uiMessage.text}
                </AlertDescription>
              </Alert>
            )}

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <CounterField label="Full Name" current={nameChars} max={50} />
                <Input
                  {...register("name")}
                  className={cn(
                    "rounded-none border-2",
                    errors.name && "border-destructive",
                  )}
                />
                {errors.name && (
                  <p className="text-destructive text-[10px] font-bold uppercase">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <CounterField
                  label="Guild Handle"
                  current={userChars}
                  max={50}
                />
                <Input
                  {...register("username")}
                  className={cn(
                    "rounded-none border-2",
                    errors.username && "border-destructive",
                  )}
                />
                {errors.username && (
                  <p className="text-destructive text-[10px] font-bold uppercase">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <CounterField
                  label="Professional Title"
                  current={titleChars}
                  max={100}
                />
                <Input
                  {...register("title")}
                  className="rounded-none border-2"
                />
                {errors.title && (
                  <p className="text-destructive text-[10px] font-bold uppercase">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <CounterField label="Location" current={locChars} max={100} />
                <Input
                  {...register("location")}
                  className="rounded-none border-2"
                />
                {errors.location && (
                  <p className="text-destructive text-[10px] font-bold uppercase">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <CounterField label="Biography" current={bioChars} max={250} />
              <Textarea
                {...register("bio")}
                className="rounded-none border-2 min-h-[100px] resize-none"
              />
              {errors.bio && (
                <p className="text-destructive text-[10px] font-bold uppercase">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Social Hardening */}
            <div className="pt-6 border-t-2 border-double">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-primary">
                External Web Connections
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest">
                    GitHub URL
                  </Label>
                  <Input
                    {...register("githubUrl")}
                    className={cn(
                      "rounded-none border-2",
                      errors.githubUrl && "border-destructive",
                    )}
                    placeholder="https://..."
                  />
                  {errors.githubUrl && (
                    <p className="text-destructive text-[10px] font-bold uppercase leading-tight">
                      {errors.githubUrl.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest">
                    Twitter (X) URL
                  </Label>
                  <Input
                    {...register("twitterUrl")}
                    className={cn(
                      "rounded-none border-2",
                      errors.twitterUrl && "border-destructive",
                    )}
                    placeholder="https://..."
                  />
                  {errors.twitterUrl && (
                    <p className="text-destructive text-[10px] font-bold uppercase leading-tight">
                      {errors.twitterUrl.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest">
                    Website URL
                  </Label>
                  <Input
                    {...register("websiteUrl")}
                    className={cn(
                      "rounded-none border-2",
                      errors.websiteUrl && "border-destructive",
                    )}
                    placeholder="https://..."
                  />
                  {errors.websiteUrl && (
                    <p className="text-destructive text-[10px] font-bold uppercase leading-tight">
                      {errors.websiteUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 border-t-2 p-8 flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onFinishedEditing}
              disabled={isUpdating}
              className="rounded-none font-bold text-xs"
            >
              Cancel Update
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || !isDirty}
              className="min-w-[180px] rounded-none font-black text-[10px] uppercase tracking-widest h-12"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Synchronize Data
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog
        open={!!croppingImage}
        onOpenChange={(open) => !open && setCroppingImage(null)}
      >
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none shadow-2xl rounded-none">
          {croppingImage && (
            <ImageCropper
              imageSrc={croppingImage.src}
              aspect={croppingImage.type === "profile" ? 1 : 3 / 1}
              onCropDone={handleCropComplete}
              onCancel={() => setCroppingImage(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
