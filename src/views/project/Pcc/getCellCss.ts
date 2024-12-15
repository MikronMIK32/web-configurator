import { CSSObject } from '@emotion/react';

export default function getCellCss(fromColumn: number, fromRow: number, width: number, height: number): CSSObject {
  return {
    gridColumn: `${fromColumn} / ${fromColumn + width}`,
    gridRow: `${fromRow} / ${fromRow + height}`,
  };
}
