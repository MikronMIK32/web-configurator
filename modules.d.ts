/// <reference types="@emotion/react/types/css-prop" />
/// <reference types="vite-plugin-svgr/client" />

/* eslint-disable max-classes-per-file */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/no-unused-class-component-methods */

declare module "react-split-pane" {
  import * as React from "react";

  export type Size = string | number;

  export type Split = "vertical" | "horizontal";

  export type SplitPaneProps = {
    allowResize?: boolean;
    className?: string;
    primary?: "first" | "second";
    minSize?: Size;
    maxSize?: Size;
    defaultSize?: Size;
    size?: Size;
    split?: "vertical" | "horizontal";
    onDragStarted?: () => void;
    onDragFinished?: (newSize: number) => void;
    onChange?: (newSize: number) => void;
    onResizerClick?: (event: MouseEvent) => void;
    onResizerDoubleClick?: (event: MouseEvent) => void;
    style?: React.CSSProperties;
    resizerStyle?: React.CSSProperties;
    paneStyle?: React.CSSProperties;
    pane1Style?: React.CSSProperties;
    pane2Style?: React.CSSProperties;
    resizerClassName?: string;
    step?: number;
    children?: React.ReactNode | React.ReactNode[];
  };

  export type SplitPaneState = {
    active: boolean;
    resized: boolean;
  };

  declare class SplitPane extends React.Component<
    SplitPaneProps,
    SplitPaneState
  > {
    constructor();

    onMouseDown(event: MouseEvent): void;

    onTouchStart(event: TouchEvent): void;

    onMouseMove(event: MouseEvent): void;

    onTouchMove(event: TouchEvent): void;

    onMouseUp(): void;

    static getSizeUpdate(
      props: SplitPaneProps,
      state: SplitPaneState
    ): Partial<SplitPaneState>;

    static defaultProps: SplitPaneProps;
  }

  export default SplitPane;

  export type PaneProps = {
    className?: string;
    size?: Size;
    split?: Split;
    style?: React.CSSProperties;
    eleRef?: (el: HTMLDivElement) => void;
    children?: React.ReactNode | React.ReactNode[];
  };

  declare class Pane extends React.PureComponent<PaneProps> {}

  export { Pane };
}


declare namespace NodeJS {
  export interface ProcessEnv {
    APP_ENV: string;
    ASSET_URL: string;
    BASE_URL: string;
    USE_LOCAL_STORAGE: string;
    API_HOST: string;
  }
}