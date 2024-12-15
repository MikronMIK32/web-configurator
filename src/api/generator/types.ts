import { CommonResponse } from '@api/common/types';
import { ProjectState } from '@store/project';

export type GenerateProjectResponse = CommonResponse<{
  url: string;
}>;

export type GenerateProjectRequest = { project: ProjectState };
