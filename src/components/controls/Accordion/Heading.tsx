import { useThemeCSSPart } from '@scripts/theme';
import { HTMLProps, ReactNode, useMemo } from 'react';
import { AccordionItemHeading as ReactAccordionItemHeading } from 'react-accessible-accordion';
import { accordionThemes } from './themes';
import { AccordionThemeState } from './types';
import useAccordion from './useAccordion';

export interface AccordionHeadingProps extends HTMLProps<HTMLDivElement> {
  /** Accordion.Button */
  children: ReactNode;
  /** Heading level */
  'aria-level'?: number;
}

export const AccordionHeading = ({
  children,
  'aria-level': ariaLevel,
  ...props
}: AccordionHeadingProps) => {
  const {
    isIconVertical,
    variant,
    size,
    theme = accordionThemes.basic,
    bordered,
  } = useAccordion();

  const state = useMemo<AccordionThemeState>(
    () => ({
      isIconVertical,
      size: size!,
      variant: variant!,
      bordered: bordered!,
    }),
    [bordered, isIconVertical, size, variant],
  );

  const getCSS = useThemeCSSPart(theme, state);

  const headingCSS = useMemo(() => getCSS('heading'), [getCSS]);

  return (
    <ReactAccordionItemHeading
      aria-level={ariaLevel}
      css={headingCSS}
      {...props}
    >
      {children}
    </ReactAccordionItemHeading>
  );
};

export default AccordionHeading;
