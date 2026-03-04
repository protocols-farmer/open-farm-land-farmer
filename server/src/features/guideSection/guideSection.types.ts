//src/features/guideSection/guideSection.types.ts
import { GuideSection } from "@prisma-client";

// The DTO now represents a GuideSection
export type GuideSectionDto = GuideSection;

/**
 * CreateGuideSectionDto
 * Data transfer object for creating a new section.
 */
export interface CreateGuideSectionDto {
  title?: string; // FIX: Marked as optional to match validation and UI logic
  content: string;
  order: number;
  videoUrl?: string;
  // Image is handled via FormData and Multer, so it is excluded from this DTO
}

/**
 * UpdateGuideSectionDto
 */
export type UpdateGuideSectionDto = Partial<CreateGuideSectionDto>;

/**
 * GuideSectionApiResponse
 * Standard API response shape for guide section operations.
 */
export interface GuideSectionApiResponse {
  status: string;
  message: string;
  data: GuideSectionDto;
}
