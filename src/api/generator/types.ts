import { CommonResponse } from '@api/common/types';

import { RootState } from '@store/index';

export type GenerateProjectResponse = CommonResponse<{
  link: string;
}>;

export type GenerateProjectRequest = RootState;
