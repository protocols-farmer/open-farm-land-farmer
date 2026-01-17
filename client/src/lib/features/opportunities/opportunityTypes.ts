// =================================================================
// FILE: src/lib/features/opportunities/opportunity.types.ts
// =================================================================
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
export interface GetOpportunitiesParams {
  skip?: number;
  take?: number;
}

export interface GetOpportunitiesResponse {
  success: boolean;
  data: OpportunityDto[];
  total: number;
}

export interface GetOpportunityResponse {
  success: boolean;
  data: OpportunityDto;
}

export interface CreateOpportunityPayload {
  title: string;
  companyName: string;
  location: string;
  type: OpportunityTypeEnum;
  fullDescription: string;
  applyUrl: string;
  companyLogo?: string;
  isRemote?: boolean;
  salaryRange?: string;
  responsibilities?: string[];
  qualifications?: string[];
  tags?: string[];
}

export interface UpdateOpportunityPayload
  extends Partial<CreateOpportunityPayload> {
  id: string;
}
