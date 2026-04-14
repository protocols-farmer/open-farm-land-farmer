//src/components/pages/admin/reports/ReportManagement.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateReportAdminSchema,
  UpdateReportAdminValues,
} from "@/lib/schemas/report.schema"; // 🚜 Clean Import
import {
  useGetAdminReportsQuery,
  useUpdateReportStatusMutation,
  useDeleteReportMutation,
} from "@/lib/features/reports/reportApiSlice";
import {
  IssueReportDto,
  ReportStatus,
  ReportType,
  Severity,
} from "@/lib/features/reports/reportTypes";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Trash2,
  Eye,
  Terminal,
  ExternalLink,
  Paperclip,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import ManagementPageLayout from "../layouts/ManagementPageLayout";
import PaginationControls from "@/components/shared/PaginationControls";
import { cn } from "@/lib/utils";

function TriageModal({
  report,
  isOpen,
  onClose,
}: {
  report: IssueReportDto | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [updateStatus, { isLoading }] = useUpdateReportStatusMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateReportAdminValues>({
    resolver: zodResolver(updateReportAdminSchema), // 🚜 Schema-driven validation
    defaultValues: {
      status: report?.status || ReportStatus.OPEN,
      severity: report?.severity || Severity.LOW,
      adminNotes: report?.adminNotes || "",
    },
  });

  useEffect(() => {
    if (report) {
      reset({
        status: report.status,
        severity: report.severity,
        adminNotes: report.adminNotes || "",
      });
    }
  }, [report, reset]);

  const onSubmit = async (values: UpdateReportAdminValues) => {
    if (!report) return;
    try {
      await updateStatus({ id: report.id, ...values }).unwrap();
      toast.success("Report updated.");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed.");
    }
  };

  if (!report) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[95vw] xl:max-w-7xl rounded-none h-[90vh] flex flex-col p-0 overflow-hidden border-2">
        <AlertDialogHeader className="p-6 border-b bg-muted/10">
          <AlertDialogTitle className="flex items-center gap-2 text-2xl font-black ">
            {report.title}
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-[10px] font-bold text-muted-foreground ">
            LOG_ID: {report.id} | {format(new Date(report.createdAt), "PPP p")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* DATA VIEW */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-muted-foreground ">
                  Technical Briefing
                </p>
                <div className="bg-muted/30 p-6 border-2 border-dashed">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {report.description}
                  </p>
                </div>
              </div>

              {report.reproductionSteps && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-muted-foreground ">
                    Reproduction Logic
                  </p>
                  <div className="bg-muted/20 p-6 border-2  text-xs leading-relaxed">
                    {report.reproductionSteps}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-[10px] font-black text-muted-foreground flex items-center gap-2 ">
                  <Paperclip className="h-3 w-3" /> Evidence (
                  {report.attachments.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {report.attachments.map((att, idx) => (
                    <a
                      key={idx}
                      href={att.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative aspect-square border-2 bg-muted overflow-hidden hover:border-foreground transition-all"
                    >
                      {att.resourceType === "image" ? (
                        <img
                          src={att.url}
                          className="h-full w-full object-cover"
                        /> // 🚜 Fancy grayscale removed
                      ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center text-[10px]  p-2 text-center">
                          <ExternalLink className="h-5 w-5 mb-1" /> ATTACHMENT
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION PANEL */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:col-span-5 space-y-6 flex flex-col h-full"
            >
              <div className="bg-muted/40 p-6 border-2 space-y-6 flex-1 shadow-inner">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground ">
                    Status
                  </label>
                  <Select
                    onValueChange={(val) =>
                      setValue("status", val as ReportStatus)
                    }
                    defaultValue={report.status}
                  >
                    <SelectTrigger className="rounded-none border-2 h-11 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {Object.values(ReportStatus).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground ">
                    Severity
                  </label>
                  <Select
                    onValueChange={(val) =>
                      setValue("severity", val as Severity)
                    }
                    defaultValue={report.severity}
                  >
                    <SelectTrigger className="rounded-none border-2 h-11 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {Object.values(Severity).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-muted-foreground ">
                      Audit Notes
                    </label>
                    <span
                      className={cn(
                        "text-[9px]  font-bold",
                        errors.adminNotes
                          ? "text-destructive"
                          : "text-muted-foreground",
                      )}
                    >
                      {watch("adminNotes")?.length || 0}/1000
                    </span>
                  </div>
                  <Textarea
                    {...register("adminNotes")}
                    className={cn(
                      "rounded-none resize-none h-48  text-xs border-2 bg-background focus-visible:ring-0",
                      errors.adminNotes && "border-destructive",
                    )}
                    placeholder="Technical logs..."
                  />
                  {errors.adminNotes && (
                    <p className="text-[9px] font-bold text-destructive ">
                      {errors.adminNotes.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-none font-black h-14 text-xs  "
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Update Report Status"
                  )}
                </Button>
                <AlertDialogCancel
                  onClick={onClose}
                  className="rounded-none font-bold border-2 h-12 text-[10px] "
                >
                  Exit
                </AlertDialogCancel>
              </div>
            </form>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function ReportManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedReport, setSelectedReport] = useState<IssueReportDto | null>(
    null,
  );
  const [deleteReport] = useDeleteReportMutation();

  const { data, isLoading } = useGetAdminReportsQuery({
    page,
    q: debouncedSearch,
  });
  const reports = data?.data.reports ?? [];
  const pagination = data?.data.pagination;

  const getSeverityColor = (sev: Severity) => {
    switch (sev) {
      case Severity.CRITICAL:
        return "bg-red-600 text-white";
      case Severity.HIGH:
        return "bg-orange-500 text-white";
      case Severity.MEDIUM:
        return "bg-yellow-500 text-black";
      default:
        return "bg-blue-500 text-white";
    }
  };

  // 🚜 HARDCODED STATUS COLORS
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.OPEN:
        return "bg-blue-600 text-white border-blue-700";
      case ReportStatus.TRIAGED:
        return "bg-amber-500 text-black border-amber-600";
      case ReportStatus.FIXED:
        return "bg-emerald-600 text-white border-emerald-700";
      case ReportStatus.DISMISSED:
        return "bg-slate-600 text-white border-slate-700";
      default:
        return "bg-secondary";
    }
  };

  return (
    <ManagementPageLayout
      title="Security & Bug Triage"
      description="Monitor structural flaws and vulnerabilities reported by researchers."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Filter by title or reporter..."
          className="w-80 rounded-none border-2 font-mono text-xs focus-visible:ring-0 focus-visible:border-primary transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="rounded-none border-2 overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-black text-[10px] ">Issue</TableHead>
              <TableHead className="font-black text-[10px] ">
                Classification
              </TableHead>
              <TableHead className="font-black text-[10px] ">
                Threat Level
              </TableHead>
              <TableHead className="font-black text-[10px] ">Status</TableHead>
              <TableHead className="font-black text-[10px] ">
                Reporter
              </TableHead>
              <TableHead className="text-right font-black text-[10px] ">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 italic">
                  Scanning logs...
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-20 font-bold text-muted-foreground "
                >
                  No Records
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow
                  key={report.id}
                  className="hover:bg-muted/30 group border-b"
                >
                  <TableCell className="max-w-60 truncate font-bold ">
                    {report.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.type === ReportType.VULNERABILITY
                          ? "destructive"
                          : "outline"
                      }
                      className="rounded-none text-[9px] font-black  border-2"
                    >
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-none text-[9px] border-0 font-black  px-3 py-1",
                        getSeverityColor(report.severity),
                      )}
                    >
                      {report.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-none text-[9px] border-2 font-black  px-3 py-1",
                        getStatusColor(report.status),
                      )}
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 rounded-none border-2">
                        <AvatarImage
                          src={report.reporter.profileImage ?? undefined}
                        />
                        <AvatarFallback className="text-[10px] bg-primary text-primary-foreground font-black">
                          {report.reporter.username.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[11px]  font-bold">
                        @{report.reporter.username}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                        className="rounded-none h-8 w-8 p-0 hover:bg-foreground hover:text-background border-2"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteReport(report.id)}
                        className="rounded-none h-8 w-8 p-0 hover:bg-destructive hover:text-white border-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <PaginationControls pagination={pagination} onPageChange={setPage} />
      )}
      <TriageModal
        report={selectedReport}
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </ManagementPageLayout>
  );
}
