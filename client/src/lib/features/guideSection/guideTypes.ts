//src/lib/features/guideSection/guideTypes.ts
export interface GuideSectionDto {
  id: string;
  title: string | null;
  content: string;
  videoUrl: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  order: number;
  stepId: string;
}

export interface GuideStepDto {
  id: string;
  title: string;
  description: string;
  order: number;
  sections: GuideSectionDto[];
  postId?: string;
}

export interface CreateGuideStepDto {
  title: string;
  description: string;
  order: number;
}

export interface UpdateGuideStepDto extends Partial<CreateGuideStepDto> {}

export interface GuideSectionApiResponse {
  success: boolean;
  data: GuideSectionDto;
}

export interface GuideStepApiResponse {
  success: boolean;
  data: GuideStepDto;
}
