import { Global } from '@emotion/react';

import { colors } from '@scripts/colors';
import fontStyles from '@scripts/fontStyles';
import typography from '@scripts/typography';

const GlobalStyles = () => (
  <Global
    styles={[
      ...fontStyles,
      {
        '*, ::before, ::after': {
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
        },
        'body,html': {
          background: 'rgb(250,250,250)',
        },
        html: {
          height: '100vh',
          padding: 0,
          margin: 0,
        },
        '#root': {
          height: '100vh',
        },
        'p,h1,h2,h3,h4,h5,h6': {
          margin: 0,
        },
        'ul,li': {
          padding: 0,
          margin: 0,
        },
        focus: {
          width: 2,
          offset: 2,
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
        },
        a: {
          display: 'inline-block',
          textDecoration: 'none',
          color: 'inherit',
        },
        'h1, h2, h3, h4, h5, h6': {
          margin: 0,
        },
        'ul li, ol li': {
          listStyle: 'none',
        },
        button: {
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        },
        'input[type="number"]': {
          appearance: 'textfield',
        },
        'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button': {
          margin: 0,
          appearance: 'none',
        },
        fieldset: {
          padding: 0,
          border: 'none',
        },
        body: {
          padding: 0,
          margin: 0,
          fontFamily: 'Calibri,Verdana,sans-serif',
          fontSize: 15,
          lineHeight: 1.4,
          ...typography('paragraphMedium'),
        },
        hr: {
          borderColor: colors.grey400,
          borderWidth: '1px 0 0 0',
          borderStyle: 'solid',
          height: 1,
        },
      },
    ]}
  />
);
export default GlobalStyles;
