//src/features/reports/report.service.ts
import prisma from "@/db/prisma.js";
import { Prisma, ReportStatus } from "@prisma-client";
import {
  CreateReportDto,
  ReportQueryDto,
  UpdateReportAdminDto,
  SanitizedReport,
  ReportAttachment,
} from "./report.types.js";
import { createHttpError } from "@/utils/error.factory.js";
import { deleteFromCloudinary } from "@/config/cloudinary.js";

class ReportService {
  public async createReport(
    reporterId: string,
    data: CreateReportDto,
    attachments: ReportAttachment[],
  ): Promise<SanitizedReport> {
    return prisma.issueReport.create({
      data: {
        ...data,
        reporterId,
        attachments: attachments as any,
      },
      include: {
        reporter: {
          select: { id: true, name: true, username: true, profileImage: true },
        },
      },
    }) as unknown as SanitizedReport;
  }

  public async getReports(query: ReportQueryDto) {
    const { page = 1, limit = 10, q, status, type, severity } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.IssueReportWhereInput = {};

    if (status) where.status = status;
    if (type) where.type = type;
    if (severity) where.severity = severity;
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { reporter: { username: { contains: q, mode: "insensitive" } } },
      ];
    }

    const [reports, total] = await prisma.$transaction([
      prisma.issueReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          reporter: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
            },
          },
          resolver: {
            select: { id: true, username: true },
          },
        },
      }),
      prisma.issueReport.count({ where }),
    ]);

    return {
      reports: reports as unknown as SanitizedReport[],
      total,
    };
  }

  public async getReportById(id: string): Promise<SanitizedReport> {
    const report = await prisma.issueReport.findUnique({
      where: { id },
      include: {
        reporter: {
          select: { id: true, name: true, username: true, profileImage: true },
        },
        resolver: {
          select: { id: true, username: true },
        },
      },
    });

    if (!report) throw createHttpError(404, "Issue report not found.");
    return report as unknown as SanitizedReport;
  }

  public async updateReport(
    id: string,
    adminId: string,
    data: UpdateReportAdminDto,
  ): Promise<SanitizedReport> {
    // 🚜 FIX: Construction of the update object to satisfy 'exactOptionalPropertyTypes'
    const updateData: Prisma.IssueReportUpdateInput = {
      ...data,
    };

    if (data.status === ReportStatus.FIXED) {
      updateData.resolver = { connect: { id: adminId } };
    }

    return prisma.issueReport.update({
      where: { id },
      data: updateData,
      include: {
        reporter: {
          select: { id: true, name: true, username: true, profileImage: true },
        },
        resolver: {
          select: { id: true, username: true },
        },
      },
    }) as unknown as SanitizedReport;
  }

  public async deleteReport(id: string): Promise<void> {
    const report = await prisma.issueReport.findUnique({ where: { id } });
    if (!report) return;

    const attachments =
      (report.attachments as unknown as ReportAttachment[]) || [];
    if (attachments.length > 0) {
      await Promise.allSettled(
        attachments.map((att) => deleteFromCloudinary(att.publicId)),
      );
    }

    await prisma.issueReport.delete({ where: { id } });
  }
}

export const reportService = new ReportService();
