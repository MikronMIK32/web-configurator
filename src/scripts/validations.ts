import { ZodTypeAny, z } from 'zod';

interface convertParams {
  invalid_type_error?: string;
  required_error?: string;
  fallbackValue?: null | undefined;
}

export const zodStringToNumber = <T extends ZodTypeAny>(
  schema: T,
  params: convertParams = {
    fallbackValue: undefined,
  }
) =>
  z.preprocess(
    a => {
      const number = Number(a);
      if (Number.isNaN(number)) return params.fallbackValue;
      return number;
    },
    schema,
    {
      invalid_type_error: params?.invalid_type_error,
      required_error: params?.required_error,
    }
  );
