// src/features/opportunities/opportunity.types.ts
import { OpportunityType } from "@prisma-client";

// DTO for creating a new opportunity
export interface CreateOpportunityDto {
  title: string;
  companyName: string;
  location: string;
  type: OpportunityType;
  fullDescription: string;
  applyUrl: string;
  companyLogo?: string;
  isRemote?: boolean;
  salaryRange?: string;
  responsibilities?: string[];
  qualifications?: string[];
  tags?: string[];
}

// DTO for updating an existing opportunity (all fields are optional)
export interface UpdateOpportunityDto extends Partial<CreateOpportunityDto> {}
