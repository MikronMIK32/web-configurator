import { CSSObject } from '@emotion/react';
export declare const useFieldCSS: ({ isError, isLabelBottom, focus, }: {
    isError?: boolean | undefined;
    isLabel?: boolean | undefined;
    isLabelBottom?: boolean | undefined;
    focus?: boolean | undefined;
}) => {
    basicFieldCSS: CSSObject;
    fieldWrapperCSS: CSSObject;
    fieldLabelCSS: CSSObject;
    fieldHintCSS: CSSObject;
    fieldErrorCSS: CSSObject;
};
