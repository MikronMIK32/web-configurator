import { type CSSProperties, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { type ModifierArguments, type Obj } from '@popperjs/core';
import maxSize from 'popper-max-size-modifier';
import { mergeRefs } from 'react-merge-refs';
import { usePopper } from 'react-popper';
import { useTransition } from 'react-transition-state';

import { Portal } from '@controls/Portal';
import { Stack, stackingOrder } from '@controls/Stack';

// import { colors } from '@scripts/gds';
import { type PopoverProps, type PopperModifier, type RefElement } from './types';

export * from './types';
const DEFAULT_TRANSITION = {
    timeout: 150,
};

const availableHieghtModifier = {
    name: 'availableHeight',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['maxSize'],
    fn({
        state: {
            modifiersData,
            elements: { popper },
        },
    }: ModifierArguments<Obj>) {
        const { height } = modifiersData.maxSize;

        const content = popper.querySelector('.scrollable-content') as HTMLElement;

        if (content && !content.style.maxHeight) {
            content.style.maxHeight = `${height}px`;
        }
    },
};

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            children,
            getPortalContainer,
            transition = DEFAULT_TRANSITION,
            anchorElement,
            useAnchorWidth,
            offset = [0, 0],
            withArrow = false,
            withTransition = false,
            position = 'left',
            preventFlip,
            popperCSS,
            arrowCSS,
            className,
            isOpen,
            update,
            transitionDuration = `${transition.timeout}ms`,
            zIndex = stackingOrder.POPOVER,
            fallbackPlacements,
            preventOverflow = true,
            availableHeight = false,
        },
        ref
    ) => {
        const [referenceElement, setReferenceElement] = useState<RefElement>(anchorElement);
        const [popperElement, setPopperElement] = useState<RefElement>(null);
        const [arrowElement, setArrowElement] = useState<RefElement>(null);

        const updatePopperRef = useRef<() => void>();

        const availableHeightContainer = useRef<HTMLDivElement | null>(null);

        const modifiers = useMemo(() => {
            const result: PopperModifier[] = [{ name: 'offset', options: { offset } }];

            if (withArrow) {
                result.push({ name: 'arrow', options: { element: arrowElement } });
            }

            if (preventFlip) {
                result.push({ name: 'flip', options: { fallbackPlacements: [] } });
            }

            if (fallbackPlacements) {
                result.push({ name: 'flip', options: { fallbackPlacements } });
            }

            if (preventOverflow) {
                result.push({
                    name: 'preventOverflow',
                    options: { mainAxis: false },
                });
            }

            if (availableHeight) {
                result.push({ ...maxSize, options: {} });
                result.push({ ...availableHieghtModifier, options: {} });
            }

            return result;
        }, [offset, withArrow, preventFlip, fallbackPlacements, preventOverflow, availableHeight, arrowElement]);

        const {
            styles: popperStyles,
            attributes,
            update: updatePopper,
        } = usePopper(referenceElement, popperElement, {
            placement: position,
            modifiers,
        });

        if (updatePopper) {
            updatePopperRef.current = updatePopper;
        }

        useEffect(() => {
            setReferenceElement(anchorElement);
        }, [anchorElement]);

        useEffect(() => {
            if (updatePopper) {
                updatePopper();
            }
        }, [updatePopper, arrowElement, children]);

        useEffect(() => {
            if (update && updatePopper) {
                // eslint-disable-next-line no-param-reassign
                update.current = updatePopper;
            }
        });

        useEffect(() => {
            if (useAnchorWidth) {
                const updatePopoverWidth = () => updatePopperRef.current?.();
                const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
                const observer = new ResizeObserver(updatePopoverWidth);

                if (anchorElement) {
                    observer.observe(anchorElement);
                }

                return () => {
                    observer.disconnect();
                };
            }

            return () => ({});
        }, [anchorElement, useAnchorWidth]);

        const renderContent = (computedZIndex: number, style?: CSSProperties) => (
            <div
                ref={mergeRefs([ref, setPopperElement])}
                style={{
                    zIndex: computedZIndex,
                    width: useAnchorWidth ? referenceElement?.offsetWidth : undefined,
                    opacity: 1,
                    transition: 'opacity .01s ease',
                    willChange: 'opacity',
                    ...popperStyles.popper,
                    ...(!popperStyles.popper.transform && {
                        opacity: 0,
                    }),
                }}
                className={className}
                {...attributes.popper}
            >
                <div
                    css={{
                        position: 'relative',
                        willChange: 'transform',
                        transitionProperty: 'opacity, transform',
                        transitionTimingFunction: 'ease-in-out',
                        ...popperCSS,
                    }}
                    style={style}
                >
                    <div
                        css={{
                            ...(availableHeight && {
                                position: 'relative',
                                zIndex: 2,
                                overflowY: 'auto',
                            }),
                        }}
                        ref={availableHeightContainer}
                        className="scrollable-content"
                    >
                        {children}
                    </div>

                    {withArrow && (
                        <div
                            ref={setArrowElement}
                            style={popperStyles.arrow}
                            css={{
                                zIndex: 1,
                                ':after': {
                                    content: "''",
                                    display: 'block',
                                    position: 'absolute',
                                    width: 12,
                                    height: 12,
                                    // border: `1px solid ${colors.primary}`,
                                    transform: 'rotate(45deg)',
                                },
                                '[data-popper-placement="left"] &, [data-popper-placement="left-start"] &, [data-popper-placement="left-end"] &':
                                    {
                                        right: 5,
                                        '&:after': {
                                            top: -6,
                                            borderBottom: 'none',
                                            borderLeft: 'none',
                                        },
                                    },
                                ...arrowCSS,
                            }}
                        />
                    )}
                </div>
            </div>
        );

        const [{ status: state, isMounted }, toggle] = useTransition({
            initialEntered: isOpen,
            timeout: transition.timeout,
            mountOnEnter: true,
            unmountOnExit: true,
            preEnter: true,
        });

        useEffect(() => {
            toggle(isOpen);
        }, [isOpen]);

        const entering = () => {
            if (state === 'entering' || state === 'entered') {
                return {
                    opacity: `1`,
                };
            }
        };

        const exiting = () => {
            if (state === 'exiting') {
                return {
                    opacity: `0`,
                };
            }
        };

        return (
            <Stack value={zIndex}>
                {computedZIndex => (
                    <Portal getPortalContainer={getPortalContainer}>
                        {withTransition
                            ? isMounted && (
                                  <div
                                      css={{
                                          pointerEvents: state !== 'unmounted' && state !== 'preEnter' ? 'all' : 'none',
                                          transition: `opacity ${transitionDuration} ease`,
                                          ...(!isOpen && { opacity: 0 }),
                                          ...entering(),
                                          ...exiting(),
                                      }}
                                  >
                                      {renderContent(computedZIndex, { transitionDuration })}
                                  </div>
                              )
                            : isOpen && renderContent(computedZIndex)}
                    </Portal>
                )}
            </Stack>
        );
    }
);

export default Popover;
