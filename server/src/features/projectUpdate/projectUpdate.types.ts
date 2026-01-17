import { ProjectUpdate, ProjectUpdateCategory } from "@prisma-client";

export type ProjectUpdateDto = ProjectUpdate;

export interface CreateProjectUpdateDto {
  version: string;
  date: string; // Will be sent as ISO string from the client
  title: string;
  description: string;
  category: ProjectUpdateCategory;
}

export type UpdateProjectUpdateDto = Partial<CreateProjectUpdateDto>;

export interface ProjectUpdateApiResponse {
  status: string;
  message: string;
  data: ProjectUpdateDto;
}
