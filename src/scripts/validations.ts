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
            if (Number.isNaN(a) || a === null || a === undefined || a === '') return params.fallbackValue;
            if (typeof a === 'number') return a;

            return Number(a as string);
        },
        schema,
        {
            invalid_type_error: params?.invalid_type_error,
            required_error: params?.required_error,
        }
    );
