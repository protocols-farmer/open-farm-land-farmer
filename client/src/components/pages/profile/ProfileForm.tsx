//src/components/pages/profile/ProfileForm.tsx
"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

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
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Loader2,
  Save,
  X,
  CheckCircle,
  Info,
  ImageIcon,
} from "lucide-react";
import ImageCropper from "@/components/shared/ImageCropper";
import { cn } from "@/lib/utils";

interface ProfileFormProps {
  user: SanitizedUserDto;
  onFinishedEditing: () => void;
}

const getInitials = (name: string | null | undefined): string => {
  if (!name) return "?";
  const words = name.split(" ").filter(Boolean);
  return (
    (words[0]?.charAt(0) ?? "") +
    (words.length > 1 ? words[words.length - 1]?.charAt(0) ?? "" : "")
  ).toUpperCase();
};

export default function ProfileForm({
  user,
  onFinishedEditing,
}: ProfileFormProps) {
  const { update: updateNextAuthSession } = useSession();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const [uiMessage, setUiMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // --- Optimization: Flattened Dependencies for Cache Busting ---
  const pImage = user.profileImage;
  const bImage = user.bannerImage;
  const uAt = user.updatedAt;

  // Initial previews with cache-busting timestamps
  // Initial previews no longer need the ?t= timestamp
  const [bannerPreview, setBannerPreview] = useState<string | undefined>(
    user.bannerImage || undefined
  );
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    user.profileImage || undefined
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
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
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

  // Clean up local blob URLs to prevent memory leaks
  React.useEffect(() => {
    return () => {
      // If the preview is a local blob URL, revoke it
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      if (bannerPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [avatarPreview, bannerPreview]);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner"
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

    if (!croppedFile) {
      setUiMessage({ type: "error", text: "Could not process image." });
      setCroppingImage(null);
      return;
    }

    const formData = new FormData();
    formData.append(
      type === "profile" ? "profileImage" : "bannerImage",
      croppedFile
    );
    setCroppingImage(null);

    try {
      const response = await updateProfile(formData).unwrap();
      const blobUrl = URL.createObjectURL(croppedFile);

      if (type === "profile") {
        setAvatarPreview(blobUrl);
        if (response.data?.user?.profileImage) {
          await updateNextAuthSession({
            user: { image: response.data.user.profileImage },
          });
        }
      } else {
        setBannerPreview(blobUrl);
      }

      if (response.data?.user) {
        await updateNextAuthSession({
          user: { ...response.data.user },
        });
      }
      setUiMessage({ type: "success", text: "Image updated successfully!" });
    } catch (err: any) {
      setUiMessage({
        type: "error",
        text: err?.data?.message || "Upload failed.",
      });
    }
  };

  const onTextSubmit: SubmitHandler<UpdateProfileFormValues> = async (data) => {
    setUiMessage(null);
    const formData = new FormData();
    let hasChanges = false;

    (Object.keys(data) as Array<keyof UpdateProfileFormValues>).forEach(
      (key) => {
        const newValue = data[key] || "";
        const oldValue = (user as any)[key] || "";
        if (newValue !== oldValue) {
          formData.append(key, newValue);
          hasChanges = true;
        }
      }
    );

    if (!hasChanges) {
      setUiMessage({ type: "info", text: "No changes to save." });
      return;
    }

    try {
      const response = await updateProfile(formData).unwrap();
      setUiMessage({ type: "success", text: response.message });

      // --- FIX: Update the ENTIRE session user object ---
      if (response.data?.user) {
        await updateNextAuthSession({
          user: { ...response.data.user },
        });
      }

      setTimeout(() => onFinishedEditing(), 1500);
    } catch (err: any) {
      setUiMessage({
        type: "error",
        text: err?.data?.message || "Update failed.",
      });
    }
  };
  return (
    <>
      <Card className="overflow-hidden border-none shadow-md">
        <form onSubmit={handleSubmit(onTextSubmit)}>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your public identity and social links.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 relative">
            {/* --- Banner Section with Mobile-Friendly Camera Icon --- */}
            <div className="relative aspect-[3/1] w-full bg-muted group overflow-hidden">
              {bannerPreview ? (
                <Image
                  key={bannerPreview}
                  src={bannerPreview}
                  alt="Banner"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-12 h-12 text-muted-foreground/20" />
                </div>
              )}

              {/* Persistent Edit Button for Banner (Mobile Friendly) */}
              <div className="absolute bottom-4 right-4 z-20">
                <Button
                  type="button"
                  size="sm"
                  className="rounded-full shadow-lg border-2 border-background bg-primary/90 hover:bg-primary"
                  onClick={() => bannerInputRef.current?.click()}
                  disabled={isUpdating}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  <span className="text-xs font-semibold">Edit Banner</span>
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

            {/* --- Avatar Section with Mobile-Friendly Camera Icon --- */}
            <div className="px-6 relative">
              <div className="relative -mt-16 h-32 w-32 shrink-0 group">
                <Avatar
                  className="h-full w-full border-4 border-background ring-2 ring-primary shadow-xl"
                  key={avatarPreview}
                >
                  <AvatarImage
                    src={avatarPreview || undefined}
                    alt="Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Persistent Edit Button for Avatar (Mobile Friendly) */}
                <Button
                  type="button"
                  size="icon"
                  className="absolute bottom-0 right-0 h-10 w-10 rounded-full border-4 border-background shadow-lg bg-primary hover:bg-primary/90 z-20"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isUpdating}
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

          <CardContent className="p-6 space-y-6">
            {/* Upload Progress */}
            {uploadState.isUploading && (
              <div className="space-y-2 bg-primary/5 p-4 rounded-lg border border-primary/10 animate-pulse">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-primary">
                  <span>Uploading {uploadState.fileName}...</span>
                  <span>{uploadState.progress}%</span>
                </div>
                <Progress value={uploadState.progress} className="h-2" />
              </div>
            )}

            {uiMessage && (
              <Alert
                variant={uiMessage.type === "error" ? "destructive" : "default"}
                className={cn(
                  uiMessage.type === "success" &&
                    "border-green-500/50 bg-green-50 text-green-700"
                )}
              >
                {uiMessage.type === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
                <AlertDescription>{uiMessage.text}</AlertDescription>
              </Alert>
            )}

            {/* Form Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  disabled={isUpdating}
                  placeholder="Your display name"
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  disabled={isUpdating}
                  placeholder="unique_handle"
                />
                {errors.username && (
                  <p className="text-destructive text-xs">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="e.g. Creative Lead & Nomad"
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Write a short introduction..."
                className="resize-none h-24"
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="e.g. Lisbon, Portugal"
                disabled={isUpdating}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub</Label>
                <Input
                  id="githubUrl"
                  {...register("githubUrl")}
                  placeholder="https://github.com/..."
                  disabled={isUpdating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter (X)</Label>
                <Input
                  id="twitterUrl"
                  {...register("twitterUrl")}
                  placeholder="https://x.com/..."
                  disabled={isUpdating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website</Label>
                <Input
                  id="websiteUrl"
                  {...register("websiteUrl")}
                  placeholder="https://..."
                  disabled={isUpdating}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 border-t p-6 flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onFinishedEditing}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || !isDirty}
              className="min-w-[140px]"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Cropping Dialog */}
      <Dialog
        open={!!croppingImage}
        onOpenChange={(open) => !open && setCroppingImage(null)}
      >
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-6 border-b bg-muted/20">
            <DialogTitle>Adjust Image</DialogTitle>
          </DialogHeader>
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
