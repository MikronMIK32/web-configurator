import { CSSObject } from '@emotion/react';
import { forwardRef, useMemo, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import BaseModal from '@controls/BaseModal';
import Loader from '@controls/Loader';

import { useThemeCSSPart } from '@scripts/theme';

import { PopupContextProvider } from './PopupContext';
import { popupThemes } from './themes';
import { ModalDesktopProps, PopupState, View } from './types';

const Popup = forwardRef<HTMLDivElement, ModalDesktopProps & { view: View }>(
  (
    {
      theme: themeName = 'basic',
      size = 'md',
      variant = 'primary',
      fixedPosition,
      children,
      className,
      view,
      flex,
      hasCloser = true,
      stickyFooter,
      stickyHeader,
      align,
      trim,
      innerScroll,
      isLoading,
      ...restProps
    },
    ref
  ) => {
    const theme = typeof themeName === 'string' ? popupThemes[themeName] : themeName;
    const state = useMemo<PopupState>(
      () => ({
        size,
        view,
        align,
        fixedPosition,
        flex,
        hasCloser,
        stickyFooter,
        stickyHeader,
        trim,
        innerScroll,
      }),
      [align, fixedPosition, flex, hasCloser, size, stickyFooter, stickyHeader, trim, view, innerScroll]
    );

    const modalRef = useRef<HTMLElement>(null);

    const handleEntered = () => {
      if (fixedPosition && modalRef.current) {
        const content = modalRef.current.querySelector<HTMLElement>('[data-role="content"]');

        if (content) {
          const { marginTop } = window.getComputedStyle(content);

          content.style.marginTop = marginTop;
        }
      }
    };

    const baseModalProps =
      view === 'desktop'
        ? {
            ref: mergeRefs([ref, modalRef]),
            onMount: handleEntered,
            backdropProps: {
              invisible: size === 'fullscreen',
              ...restProps.backdropProps,
            },
          }
        : {
            ref,
            className,
          };

    const getCSS = useThemeCSSPart(theme, {
      ...state,
      size,
      variant,
    });

    return (
      <PopupContextProvider size={size} theme={theme} variant={variant} state={state}>
        <BaseModal
          {...restProps}
          css={getCSS('component') as CSSObject}
          wrapperCSS={{
            ...(getCSS('wrapper') as CSSObject),
            ...restProps.wrapperCSS,
          }}
          {...baseModalProps}
        >
          {isLoading ? <Loader /> : children}
        </BaseModal>
      </PopupContextProvider>
    );
  }
);

export default Popup;
