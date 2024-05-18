import { CommonResponse } from '@api/common/types';

import { RootState } from '@store/index';

export type GenerateProjectResponse = CommonResponse<{
  url: string;
}>;

export type GenerateProjectRequest = { project: RootState };
