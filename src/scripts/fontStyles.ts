import { CSSObject } from "@emotion/react";

/** all fonts are in public folder */
type FontStyles = { "@font-face": CSSObject }[];

const fontStyles: FontStyles = [
  {
    "@font-face": {
      fontFamily: "Stolzl",
      src: `url('/fonts/Stolzl/Stolzl-Regular.woff2') format('woff2'), url(/fonts/Stolzl/Stolzl-Regular.woff) format('woff')`,
      fontDisplay: "swap",
    },
  },
  {
    "@font-face": {
      fontFamily: "Stolzl",
      src: `url('/fonts/Stolzl/Stolzl-Medium.woff2') format('woff2'), url('/fonts/Stolzl/Stolzl-Medium.woff') format('woff')`,
      fontDisplay: "swap",
      fontWeight: 500,
    },
  },
  {
    "@font-face": {
      fontFamily: "Stolzl",
      src: `url('/fonts/Stolzl/Stolzl-Bold.woff2') format('woff2'), url('/fonts/Stolzl/Stolzl-Bold.woff') format('woff')`,
      fontDisplay: "swap",
      fontWeight: 700,
    },
  },
  {
    "@font-face": {
      fontFamily: "Calibri",
      src: `url('/fonts/Calibri/Calibri.woff2') format('woff2'), url('/fonts/Calibri/Calibri.woff') format('woff')`,
      fontDisplay: "swap",
    },
  },
  {
    "@font-face": {
      fontFamily: "Calibri",
      src: `url('/fonts/Calibri/Calibri-Bold.woff2') format('woff2'), url('/fonts/Calibri/Calibri-Bold.woff') format('woff')`,
      fontDisplay: "swap",
      fontWeight: 700,
    },
  },
];

export default fontStyles;
