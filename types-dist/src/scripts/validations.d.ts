import { ZodTypeAny, z } from 'zod';
interface convertParams {
    invalid_type_error?: string;
    required_error?: string;
    fallbackValue?: null | undefined;
}
export declare const zodStringToNumber: <T extends ZodTypeAny>(schema: T, params?: convertParams) => z.ZodEffects<T, T["_output"], unknown>;
export {};
