/**
 * src/lib/features/opportunities/opportunity.types.ts
 * Foundational types for the Opportunity (Jobs) feature.
 * Synchronized with Prisma OpportunityType Enum.
 */

export type OpportunityTypeEnum =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP";

interface OpportunityPoster {
  name: string;
  profileImage: string | null;
}

interface OpportunityTag {
  tag: {
    id: string;
    name: string;
  };
}

export interface OpportunityDto {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string | null;
  companyLogoPublicId?: string | null;
  location: string;
  type: OpportunityTypeEnum;
  isRemote: boolean;
  salaryRange: string | null;
  fullDescription: string;
  responsibilities: string[];
  qualifications: string[];
  applyUrl: string;
  postedAt: string;
  poster: OpportunityPoster;
  tags: OpportunityTag[];
}

// --- API Payloads and Responses ---

/**
 * 🚜 REFINED: Params now support full search, filtering, and tag scoping.
 */
export interface GetOpportunitiesParams {
  skip?: number;
  take?: number;
  q?: string;
  type?: OpportunityTypeEnum | "All";
  isRemote?: boolean | string;
  tags?: string;
}

// src/lib/features/opportunities/opportunityTypes.ts

export interface GetOpportunitiesResponse {
  success: boolean;
  data: OpportunityDto[];
  total: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface GetOpportunityResponse {
  success: boolean;
  data: OpportunityDto;
}

/**
 * 🚜 Note: Create/Update payloads are usually wrapped in FormData
 * on the frontend to support the companyLogo file upload.
 */
export interface CreateOpportunityPayload {
  title: string;
  companyName: string;
  location: string;
  type: OpportunityTypeEnum;
  fullDescription: string;
  applyUrl: string;
  isRemote?: boolean;
  salaryRange?: string;
  responsibilities?: string[];
  qualifications?: string[];
  tags?: string[];
}

export interface UpdateOpportunityPayload extends Partial<CreateOpportunityPayload> {
  id: string;
  retainedLogoUrl?: string;
}
