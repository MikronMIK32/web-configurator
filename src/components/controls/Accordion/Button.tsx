import { useThemeCSSPart } from '@scripts/theme';
import { HTMLProps, ReactNode, useMemo } from 'react';
import { AccordionItemButton as ReactAccordionItemButton } from 'react-accessible-accordion';
import { accordionThemes } from './themes';
import { AccordionThemeState } from './types';

import useAccordion from './useAccordion';

export interface AccordionButtonProps extends HTMLProps<HTMLDivElement> {
  /** Heading content */
  children: ReactNode;
}

export const AccordionButton = ({
  children,
  ...props
}: AccordionButtonProps) => {
  const {
    Icon,
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

  const buttonCSS = useMemo(() => getCSS('button'), [getCSS]);

  return (
    <ReactAccordionItemButton css={buttonCSS} {...props}>
      {children}
      {Icon && <Icon aria-hidden />}
    </ReactAccordionItemButton>
  );
};

export default AccordionButton;
