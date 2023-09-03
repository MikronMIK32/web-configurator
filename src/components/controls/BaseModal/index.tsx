/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import {
  KeyboardEvent,
  MouseEvent,
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import FocusLock from 'react-focus-lock';
import { mergeRefs } from 'react-merge-refs';
import { useTransition } from 'react-transition-state';

import DefaultBackdrop from '@controls/Backdrop';
import { Portal } from '@controls/Portal';
import { Stack, stackingOrder } from '@controls/Stack';

import type { BaseModalContextType, BaseModalProps } from './types';
import {
  getScrollbarSize,
  handleContainer,
  hasScrollbar,
  isScrolledToBottom,
  isScrolledToTop,
  restoreContainerStyles,
} from './utils';

export * from './types';

export const BaseModalContext = createContext<BaseModalContextType>({
  hasFooter: false,
  hasHeader: false,
  hasScroll: false,
  headerHighlighted: false,
  footerHighlighted: false,
  headerOffset: 0,
  setHeaderOffset: () => null,
  contentRef: () => null,
  setHasHeader: () => null,
  setHasFooter: () => null,
  onClose: () => null,
});

const BaseModal = forwardRef<HTMLDivElement, BaseModalProps>(
  (
    {
      open,
      container,
      children,
      scrollHandler = 'wrapper',
      Backdrop = DefaultBackdrop,
      backdropProps = {},
      disableBackdropClick,
      disableAutoFocus = false,
      disableFocusLock = false,
      disableEscapeKeyDown = false,
      disableRestoreFocus = false,
      disableBlockingScroll = false,
      keepMounted = false,
      className,
      contentCSS,
      wrapperCSS = {},
      onBackdropClick,
      onClose,
      onEscapeKeyDown,
      onMount,
      onUnmount,
      dataTestId,
      zIndex = stackingOrder.MODAL,
      componentRef = null,
      timeout = 200,
      styles = {
        preEnter: {
          opacity: 0,
          transform: 'scale(0.85)',
          transition: `transform ${timeout * 1.5}ms ease-in, opacity ${timeout}ms ease-in`,
        },
        entering: {
          opacity: 1,
          transform: 'scale(1)',
          transition: `transform ${timeout * 1.5}ms ease-out, opacity ${timeout}ms ease-in`,
        },
        entered: {
          opacity: 1,
          transform: 'scale(1)',
          transition: `transform ${timeout * 1.5}ms ease-out, opacity ${timeout}ms ease`,
        },
        exiting: {
          opacity: 0,
          transform: 'scale(0.85)',
          transition: `transform ${timeout * 1.5}ms ease-out, opacity ${timeout}ms ease-in`,
        },
        exited: {
          opacity: 0,
        },
      },
      id,
    },
    ref
  ) => {
    const [exited, setExited] = useState<boolean | null>(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [hasHeader, setHasHeader] = useState(false);
    const [hasFooter, setHasFooter] = useState(false);
    const [headerHighlighted, setHeaderHighlighted] = useState(false);
    const [footerHighlighted, setFooterHighlighted] = useState(false);
    const [headerOffset, setHeaderOffset] = useState(0);

    const componentNodeRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
    const contentNodeRef = useRef<HTMLDivElement | null>(null);
    const restoreContainerStylesRef = useRef<null | (() => void)>(null);
    const mouseDownTarget = useRef<HTMLElement>();
    const resizeObserverRef = useRef<ResizeObserver>();

    const [{ status, isMounted }, toggle] = useTransition({
      timeout,
      unmountOnExit: true,
      mountOnEnter: true,
      preEnter: true,
    });

    useEffect(() => {
      toggle(open);
    }, [open]);

    const checkToHasScrollBar = () => {
      if (scrollableNodeRef.current) {
        const scrollExists = hasScrollbar(scrollableNodeRef.current);

        // Disable if need to remove shadows/background from footer at bottom of scroll
        setFooterHighlighted(scrollExists);
        setHasScroll(scrollExists);
      }
    };

    const [isBackdropDestroyed, setBackdropDestroyed] = useState(false);

    useEffect(() => {
      if (open) setBackdropDestroyed(false);
    }, [open]);

    const isExited = exited || exited === null;
    const shouldRender = keepMounted || open || !isExited || !isBackdropDestroyed;

    const getContainer = useCallback(() => (container ? container() : document.body) as HTMLElement, [container]);

    const addResizeHandle = useCallback(() => {
      if (!resizeObserverRef.current) return;

      if (scrollableNodeRef.current) {
        resizeObserverRef.current.observe(scrollableNodeRef.current);
      }
      if (contentNodeRef.current) {
        resizeObserverRef.current.observe(contentNodeRef.current);
      }
    }, []);

    const removeResizeHandle = useCallback(() => resizeObserverRef.current?.disconnect(), []);

    const contentRef = useCallback((node: HTMLDivElement) => {
      if (node !== null) {
        contentNodeRef.current = node;
        if (resizeObserverRef.current) {
          resizeObserverRef.current.observe(node);
        }
        checkToHasScrollBar();
      }
    }, []);

    const isPropsScrollRef =
      typeof scrollHandler === 'function' || (typeof scrollHandler === 'object' && 'current' in scrollHandler);

    const handleScroll = useCallback(() => {
      if (!scrollableNodeRef.current || !componentNodeRef.current) return;

      if (hasHeader) {
        const isScrolled = componentNodeRef.current.getBoundingClientRect().top - headerOffset <= 0;
        setHeaderHighlighted(!isScrolledToTop(scrollableNodeRef.current) && (isScrolled || isPropsScrollRef));
      }

      if (hasFooter) {
        setFooterHighlighted(
          !isScrolledToBottom(scrollableNodeRef.current) &&
            componentNodeRef.current.getBoundingClientRect().bottom >= window.innerHeight
        );
      }
    }, [hasFooter, hasHeader, headerOffset, isPropsScrollRef]);

    const handleClose = useCallback<Required<BaseModalProps>['onClose']>(
      (event, reason) => {
        if (onClose) {
          onClose(event, reason);
        }

        if (reason === 'backdropClick' && onBackdropClick) {
          onBackdropClick(event as MouseEvent);
        }

        if (reason === 'escapeKeyDown' && onEscapeKeyDown) {
          onEscapeKeyDown(event as KeyboardEvent);
        }

        return null;
      },
      [onBackdropClick, onClose, onEscapeKeyDown]
    );

    const handleBackdropMouseDown = (event: MouseEvent<HTMLElement>) => {
      let clickedOnScrollbar = false;
      const clientWidth = (event.target as HTMLElement)?.clientWidth;

      if (event.clientX && clientWidth) {
        // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
        const offset = getScrollbarSize() === 0 ? 17 : 0;

        clickedOnScrollbar = event.clientX + offset > clientWidth;
      }

      if (!disableBackdropClick && !clickedOnScrollbar) {
        mouseDownTarget.current = event.target as HTMLElement;
      }
    };

    const handleBackdropMouseUp = (event: MouseEvent<HTMLElement>) => {
      if (
        !disableBackdropClick &&
        event.target === wrapperRef.current &&
        mouseDownTarget.current === wrapperRef.current
      ) {
        handleClose(event, 'backdropClick');
      }

      mouseDownTarget.current = undefined;
    };

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        /*
         * Чтобы сохранить дефолтное поведение элементов и событий форм,
         * обработчик не устанавливает event.preventDefault()
         */
        if (event.key !== 'Escape') {
          return;
        }

        // Если есть обработчик escape на body
        event.stopPropagation();

        if (!disableEscapeKeyDown && handleClose) {
          handleClose(event, 'escapeKeyDown');
        }
      },
      [disableEscapeKeyDown, handleClose]
    );

    const getScrollHandler = useCallback(() => {
      if (scrollHandler === 'wrapper') return wrapperRef.current;
      if (scrollHandler === 'content') return componentNodeRef.current;

      return scrollHandler.current || wrapperRef.current;
    }, [scrollHandler]);

    const handleEntered = useCallback(() => {
      scrollableNodeRef.current = getScrollHandler();

      addResizeHandle();

      if (scrollableNodeRef.current) {
        scrollableNodeRef.current.addEventListener('scroll', handleScroll);
        handleScroll();
      }

      if (onMount) setTimeout(() => onMount(), timeout);
    }, [addResizeHandle, getScrollHandler, handleScroll, onMount]);

    const handleExited = useCallback(() => {
      removeResizeHandle();

      setExited(true);

      if (scrollableNodeRef.current) {
        scrollableNodeRef.current.removeEventListener('scroll', handleScroll);
      }

      if (restoreContainerStylesRef.current) {
        restoreContainerStylesRef.current();
      }

      if (onUnmount) setTimeout(() => onUnmount(), timeout);
    }, [handleScroll, onUnmount, removeResizeHandle]);

    const handlersRef = useRef({
      entered: handleEntered,
      exited: handleExited,
    });
    handlersRef.current.entered = handleEntered;
    handlersRef.current.exited = handleExited;

    useEffect(() => {
      if (status === 'entering') handlersRef.current.entered();
      if (status === 'exiting') handlersRef.current.exited();
    }, [status]);

    useEffect(() => {
      if (open && isExited) {
        if (!disableBlockingScroll) {
          const el = getContainer();

          handleContainer(el);

          restoreContainerStylesRef.current = () => {
            restoreContainerStylesRef.current = null;
            restoreContainerStyles(el);
          };
        }

        setExited(false);
      }
    }, [getContainer, open, disableBlockingScroll, isExited]);

    useEffect(() => {
      const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

      resizeObserverRef.current = new ResizeObserver(checkToHasScrollBar);

      return () => {
        if (restoreContainerStylesRef.current) {
          restoreContainerStylesRef.current();
        }

        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    }, []);

    const contextValue = useMemo<BaseModalContextType>(
      () => ({
        hasHeader,
        hasFooter,
        hasScroll,
        headerHighlighted,
        footerHighlighted,
        headerOffset,
        setHeaderOffset,
        contentRef,
        setHasHeader,
        setHasFooter,
        onClose: handleClose,
      }),
      [
        contentRef,
        hasHeader,
        hasFooter,
        hasScroll,
        headerHighlighted,
        footerHighlighted,
        headerOffset,
        setHeaderOffset,
        handleClose,
      ]
    );

    return (
      <Stack value={zIndex}>
        {computedZIndex => (
          <Portal getPortalContainer={container}>
            <BaseModalContext.Provider value={contextValue}>
              <FocusLock
                autoFocus={!disableAutoFocus}
                disabled={disableFocusLock || !open || !shouldRender}
                returnFocus={!disableRestoreFocus}
              >
                {Backdrop && (
                  <Backdrop
                    timeout={timeout}
                    {...backdropProps}
                    open={open && shouldRender}
                    style={{
                      zIndex: computedZIndex,
                    }}
                    onDestroy={() => setBackdropDestroyed(true)}
                  />
                )}
                {isMounted && (
                  <div
                    role="dialog"
                    css={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      overflow: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      outline: 0,
                      ...(!open &&
                        isExited &&
                        isBackdropDestroyed && {
                          display: 'none',
                        }),
                      ...styles[status],
                      ...wrapperCSS,
                    }}
                    ref={mergeRefs([ref, wrapperRef])}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleBackdropMouseDown}
                    onMouseUp={handleBackdropMouseUp}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex={0}
                    data-test-id={dataTestId}
                    style={{
                      zIndex: computedZIndex,
                    }}
                    id={id}
                  >
                    <div
                      data-role="component"
                      className={className}
                      css={{
                        position: 'relative',
                        margin: 'auto',
                        flexShrink: 0,
                      }}
                      ref={mergeRefs([componentRef, componentNodeRef])}
                    >
                      <div
                        data-role="content"
                        css={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          ...contentCSS,
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                )}
              </FocusLock>
            </BaseModalContext.Provider>
          </Portal>
        )}
      </Stack>
    );
  }
);

export default BaseModal;
