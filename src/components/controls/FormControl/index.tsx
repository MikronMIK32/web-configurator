import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import { forwardRef, useMemo } from 'react';

import { useThemeCSSPart } from '@scripts/theme';

import { formControlThemes } from './themes';
import { FormControlProps, FormControlThemeState } from './types';

export * from './types';

const EMPTY_OBJECT = {};

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
    (
        {
            block = false,
            theme: themeName = 'basic',
            size = 'md',
            variant = 'primary',
            className,
            labelCSS = EMPTY_OBJECT,
            fieldCSS = EMPTY_OBJECT,
            leftAddonsCSS = EMPTY_OBJECT,
            rightAddonsCSS = EMPTY_OBJECT,
            wrapperCSS = EMPTY_OBJECT,
            disabled,
            readOnly,
            focused,
            filled,
            error,
            hint,
            label,
            labelView = 'outer',
            leftAddons,
            rightAddons,
            bottomAddons,
            children,
            htmlFor,
            labelWrap = false,
            labelProps = EMPTY_OBJECT,
            ...restProps
        },
        ref
    ) => {
        const theme = typeof themeName === 'string' ? formControlThemes[themeName] : themeName;
        const errorMessage = typeof error === 'boolean' ? '' : error;

        const hasError = !!error;

        const hasLeftAddons = !!leftAddons;
        const hasRightAddons = !!rightAddons || !!error;
        const hasInnerLabel = !!label && labelView === 'inner';

        const state = useMemo<Omit<FormControlThemeState, 'theme'>>(
            () => ({
                block,
                disabled,
                filled,
                focused,
                hasError,
                labelView,
                readOnly,
                size,
                hasLeftAddons,
                hasRightAddons,
                hasInnerLabel,
                labelWrap,
                variant,
            }),
            [
                block,
                disabled,
                filled,
                focused,
                hasError,
                labelView,
                readOnly,
                size,
                hasLeftAddons,
                hasRightAddons,
                hasInnerLabel,
                labelWrap,
                variant,
            ]
        );

        const getCSS = useThemeCSSPart(theme, state);
        const totalWrapperCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('wrapper'), wrapperCSS!]),
            [wrapperCSS, getCSS]
        );
        const innerCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('inner'), fieldCSS!]), [fieldCSS, getCSS]);

        return (
            <div className={className} css={totalWrapperCSS}>
                {label && labelView === 'outer' && (
                    <label
                        htmlFor={htmlFor}
                        css={{
                            ...getCSS('label'),
                            ...labelCSS
                        }}
                        {...labelProps}
                    >
                        {label}
                    </label>
                )}
                <div {...restProps} css={innerCSS} ref={ref}>
                    {leftAddons && (
                        <div css={deepmerge.all<CSSObject>([getCSS('addons', { isLeft: true }), leftAddonsCSS])}>
                            {leftAddons}
                        </div>
                    )}
                    {label && labelView === 'inner' && (
                        <span
                            css={{
                                position: 'absolute',
                                left: -9999,
                                top: 'auto',
                                width: 1,
                                height: 1,
                                overflow: 'hidden',
                            }}
                            aria-hidden
                        >
                            {label}
                        </span>
                    )}
                    <div
                        css={{
                            flexGrow: 1,
                            ...(!labelWrap && {
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }),
                            '.control': getCSS('controlWrapper'),
                        }}
                    >
                        {children}
                    </div>
                    {label && labelView === 'inner' && (
                        <label
                            htmlFor={htmlFor}
                            css={{
                                ...getCSS('labelInner'),
                                ...labelCSS,
                            }}
                            {...labelProps}
                        >
                            {label}
                        </label>
                    )}

                    {rightAddons && (
                        <div css={deepmerge.all<CSSObject>([getCSS('addons', { isLeft: false }), rightAddonsCSS])}>
                            {rightAddons}
                        </div>
                    )}
                </div>

                {bottomAddons}

                {errorMessage && (
                    <div css={getCSS('sub')} role="alert">
                        {errorMessage}
                    </div>
                )}

                {hint && !errorMessage && <span css={getCSS('sub')}>{hint}</span>}
            </div>
        );
    }
);

FormControl.displayName = 'FormControl';

export default FormControl;
