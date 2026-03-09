// server/src/features/opportunities/opportunity.types.ts

import { OpportunityType } from "@prisma-client";

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
  companyLogo?: string;
  companyLogoPublicId?: string;
}

export interface UpdateOpportunityDto extends Partial<CreateOpportunityDto> {
  retainedLogoUrl?: string;
}

/**
 * 🚜 FILTER TYPE: Scoped for high-performance Prisma queries.
 */
export interface OpportunityQueryFilters {
  q?: string;
  type?: OpportunityType;
  isRemote?: boolean | string; // Handle both direct boolean and string from query
  tags?: string;
  skip?: number;
  take?: number;
}
