import { OpportunityType } from "@prisma-client";

/**
 * DTO for creating a new opportunity.
 * Note: companyLogo and publicId are populated by the controller
 * after the Cloudinary upload.
 */
export interface CreateOpportunityDto {
  title: string;
  companyName: string;
  location: string;
  type: OpportunityType;
  fullDescription: string;
  applyUrl: string;
  isRemote?: boolean;
  salaryRange?: string;
  responsibilities?: string[];
  qualifications?: string[];
  tags?: string[];
  // 🚜 Cloudinary Assets
  companyLogo?: string;
  companyLogoPublicId?: string;
}

/**
 * DTO for updating an existing opportunity.
 * Includes 'retainedLogoUrl' to determine if we should delete the old asset.
 */
export interface UpdateOpportunityDto extends Partial<CreateOpportunityDto> {
  retainedLogoUrl?: string;
}
