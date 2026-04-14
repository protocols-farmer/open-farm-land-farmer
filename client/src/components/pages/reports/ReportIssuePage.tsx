//src/components/pages/reports/ReportIssuePage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  submitReportSchema,
  SubmitReportFormValues,
} from "@/lib/schemas/report.schema";
import { useSubmitReportMutation } from "@/lib/features/reports/reportApiSlice";
import { ReportType, Severity } from "@/lib/features/reports/reportTypes";
import {
  ShieldAlert,
  Send,
  Upload,
  X,
  Loader2,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ReportIssuePage() {
  const [submitReport, { isLoading }] = useSubmitReportMutation();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]); // 🚜 New Preview State
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SubmitReportFormValues>({
    resolver: zodResolver(submitReportSchema),
    defaultValues: {
      title: "",
      description: "",
      reproductionSteps: "",
      type: ReportType.BUG,
      severity: Severity.LOW,
    },
    mode: "onChange",
  });

  // 🚜 Sync Previews
  useEffect(() => {
    const newPreviews = files.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
    );
    setPreviews(newPreviews);

    // Cleanup memory
    return () => newPreviews.forEach((url) => url && URL.revokeObjectURL(url));
  }, [files]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 5) {
        toast.error("Limit: 5 attachments.");
        return;
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: SubmitReportFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.reproductionSteps)
      formData.append("reproductionSteps", data.reproductionSteps);
    formData.append("type", data.type);
    formData.append("severity", data.severity);
    files.forEach((file) => formData.append("attachments", file));

    try {
      await submitReport(formData).unwrap();
      setIsSuccess(true);
      toast.success("Issue reported.");
    } catch (err: any) {
      console.error("SUBMISSION_ERROR:", err);
      toast.error(err?.data?.message || "Submission failed.");
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <Card className="max-w-md w-full rounded-none border-2 text-center py-10 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="mx-auto p-4 bg-primary/10 border-2 border-primary w-fit">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black">Logged</CardTitle>
            <CardDescription className="font-medium">
              Report received. Our developers will triage the issue shortly.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-none font-bold"
              onClick={() => (window.location.href = "/")}
            >
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <Card className="rounded-none border-2 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="border-b-2 pb-8 bg-muted/30">
          <div className="flex items-center gap-4 text-primary">
            <div className="p-2 border-2 border-primary bg-primary/10">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <CardTitle className="text-4xl font-black  ">Issue Log</CardTitle>
          </div>
          <CardDescription className="mt-4 font-medium border-l-4 border-primary pl-4">
            Report bugs or security flaws. Technical details are required.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="pt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black ">
                        Type <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-none border-2">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          <SelectItem value={ReportType.BUG}>
                            Bug / Error
                          </SelectItem>
                          <SelectItem value={ReportType.VULNERABILITY}>
                            Security Risk
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black ">
                        Severity <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-none border-2">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {Object.values(Severity).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-black ">
                        Summary <span className="text-destructive">*</span>
                      </FormLabel>
                      <span
                        className={cn(
                          "text-[9px] font-bold",
                          (form.watch("title")?.length || 0) > 150
                            ? "text-destructive"
                            : "text-muted-foreground",
                        )}
                      >
                        {form.watch("title")?.length || 0} / 150
                      </span>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-none border-2"
                        placeholder="Brief summary..."
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-black ">
                        Details <span className="text-destructive">*</span>
                      </FormLabel>
                      <span
                        className={cn(
                          "text-[9px] font-bold",
                          (form.watch("description")?.length || 0) > 2000
                            ? "text-destructive"
                            : "text-muted-foreground",
                        )}
                      >
                        {form.watch("description")?.length || 0} / 2000
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="rounded-none min-h-32 resize-none border-2"
                        placeholder="Explain the behavior..."
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reproductionSteps"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-black ">
                        Reproduction{" "}
                        <span className="text-muted-foreground">
                          (Optional)
                        </span>
                      </FormLabel>
                      <span
                        className={cn(
                          "text-[9px] font-bold",
                          (form.watch("reproductionSteps")?.length || 0) > 2000
                            ? "text-destructive"
                            : "text-muted-foreground",
                        )}
                      >
                        {form.watch("reproductionSteps")?.length || 0} / 2000
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="rounded-none font-mono text-sm min-h-32 border-2"
                        placeholder="Steps to trigger the bug..."
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <label className="text-[10px] font-black ">
                  Evidence{" "}
                  <span className="text-muted-foreground">(Max 5)</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground font-bold  ">
                        Log screenshots or JSON logs
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={onFileChange}
                      accept="image/*,.json,.txt,.log"
                    />
                  </label>
                </div>

                {/* 🚜 Image Preview Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square border-2 bg-muted group"
                    >
                      {previews[idx] ? (
                        <Image
                          src={previews[idx]}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center flex-col p-2 text-[8px] text-center font-mono overflow-hidden">
                          <ImageIcon className="h-4 w-4 mb-1" />
                          <span className="truncate w-full">{file.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1 rounded-none border-2 border-background opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t-2 pt-6 mt-6 bg-muted/20 justify-between">
              <Button
                type="button"
                variant="ghost"
                className="rounded-none font-bold"
                onClick={() => window.history.back()}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-none font-black px-10"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                SUBMIT LOG
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
