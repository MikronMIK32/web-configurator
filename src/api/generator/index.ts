import {
  useMutation,
  /* useQueryClient */
} from '@tanstack/react-query';

import { FetchError } from '@api/common/types';

import { apiClient } from '../index';
import { GenerateProjectRequest, GenerateProjectResponse } from './types';

export const useGenerateProject = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const queryClient = useQueryClient();

  return useMutation<GenerateProjectResponse, FetchError, GenerateProjectRequest>(
    {
      mutationFn: data => apiClient.post('generate', { data }),
      onSuccess: () => {
        // TODO: invalidate smth
        // queryClient.invalidateQueries([]);
      },
    }
  );
};
