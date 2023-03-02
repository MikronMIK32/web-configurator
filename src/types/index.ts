import { FC, SVGProps } from "react";

export type SVGRIcon = FC<
  SVGProps<SVGSVGElement> & {
    /** Alternative text in title tag. */
    title?: string;
  }
>;

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
