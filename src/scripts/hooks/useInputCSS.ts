import { CSSObject } from '@emotion/react';

import { colors } from '@scripts/colors';

const inputCSS: CSSObject = {
    '@keyframes autofill': {
        '0%': {
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        },
        '100%': {
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.01)',
        },
    },
    width: '100%',
    WebkitAppearance: 'none',
    position: 'relative',

    ':disabled': {
        cursor: 'not-allowed',
    },
    '::placeholder': {
        color: colors.grey400,
    },
    background: 'transparent',
    outline: 'none!important',
    border: 'none!important',
    textOverflow: 'ellipsis',
    '&:-webkit-autofill': {
        WebkitTransition: 'background-color 999999s ease-in-out 0s',
        transition: 'background-color 999999s ease-in-out 0s',
        '&:hover,:&active,&:focus': {
            WebkitTransition: 'background-color 999999s ease-in-out 0s',
            transition: 'background-color 999999s ease-in-out 0s',
        },
        animation: 'autofill 999999s forwards',
    },
    '&:not(:-webkit-autofill)': {
        animation: 'autofill 999999s',
    },
};

export const useInputCSS = () => inputCSS;
