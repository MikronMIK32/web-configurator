import { useThemeCSSPart } from '@scripts/theme';
import { HTMLProps, ReactNode, useMemo } from 'react';
import {
  AccordionItemPanel as ReactAccordionItemPanel,
  AccordionItemState as ReactAccordionItemState,
} from 'react-accessible-accordion';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import { accordionThemes } from './themes';
import { AccordionThemeState } from './types';

import useAccordion from './useAccordion';

const CSSTransition = ReactCSSTransition as any;

export interface AccordionPanelProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref'> {
  /** Panel content */
  children: ReactNode;
}

export const AccordionPanel = ({ children, ...props }: AccordionPanelProps) => {
  const {
    panelNoPadding,
    animationType,
    transitionTimeout,
    transitionTimeoutExit,
    onEnter,
    onEntering,
    onExit,
    isIconVertical,
    variant,
    size,
    theme = accordionThemes.basic,
    bordered,
  } = useAccordion();

  const handleEnter = (...args: [HTMLElement, boolean]) => {
    const [instance] = args;
    if (onEnter) {
      onEnter(...args);
    } else if (animationType === 'height') {
      instance.style.height = `0px`;
      instance.style.transition = `height ease ${transitionTimeout}ms`;
    } else if (animationType === 'fadeIn') {
      instance.style.animation = `fade-in ${transitionTimeout}ms ease`;
    }
  };

  const handleEntering = (...args: [HTMLElement, boolean]) => {
    const [instance] = args;
    if (onEntering) {
      onEntering(...args);
    } else if (
      animationType === 'height' &&
      instance.children[0] instanceof HTMLElement
    ) {
      instance.style.height = `${instance.children[0].offsetHeight}px`;
    }
  };

  const handleExit = (...args: [HTMLElement]) => {
    const [instance] = args;
    if (onExit) {
      onExit(...args);
    } else if (animationType === 'height') {
      instance.style.height = `0px`;
    } else if (animationType === 'fadeIn') {
      instance.style.animation = ``;
    }
  };

  const state = useMemo<AccordionThemeState>(
    () => ({
      panelNoPadding,
      isIconVertical,
      size: size!,
      variant: variant!,
      bordered: bordered!,
    }),
    [panelNoPadding, isIconVertical, size, variant, bordered],
  );

  const getCSS = useThemeCSSPart(theme, state);
  const panelCSS = useMemo(() => getCSS('panel'), [getCSS]);

  return animationType ? (
    <ReactAccordionItemState>
      {({ expanded }) => (
        <CSSTransition
          in={expanded}
          timeout={{ enter: transitionTimeout, exit: transitionTimeoutExit }}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onExit={handleExit}
          unmountOnExit
        >
          <div
            css={{
              overflow: 'hidden',
              '@keyframes fade-in': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }}
            {...props}
          >
            <ReactAccordionItemPanel css={panelCSS}>
              {children}
            </ReactAccordionItemPanel>
          </div>
        </CSSTransition>
      )}
    </ReactAccordionItemState>
  ) : (
    <ReactAccordionItemPanel css={panelCSS} {...props}>
      {children}
    </ReactAccordionItemPanel>
  );
};

export default AccordionPanel;
