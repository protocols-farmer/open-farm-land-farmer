//src/features/guideSection/guideStep.types.ts
import { GuideStep } from "@prisma-client";

export type GuideStepDto = GuideStep;

export interface CreateGuideStepDto {
  title: string;
  description: string;
  order: number;
}

export type UpdateGuideStepDto = Partial<CreateGuideStepDto>;
