//src/features/guideSection/guideSection.types.ts
import { GuideSection } from "@prisma-client";

export type GuideSectionDto = GuideSection;

/**
 * CreateGuideSectionDto
 */
export interface CreateGuideSectionDto {
  title?: string;
  content: string;
  order: number;
  videoUrl?: string;
}

/**
 * UpdateGuideSectionDto
 */
export type UpdateGuideSectionDto = Partial<CreateGuideSectionDto>;

/**
 * GuideSectionApiResponse
 */
export interface GuideSectionApiResponse {
  status: string;
  message: string;
  data: GuideSectionDto;
}
