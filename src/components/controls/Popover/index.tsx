import { CSSObject } from '@emotion/react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { BasePlacement, ModifierArguments, Obj, VariationPlacement } from '@popperjs/core';
import maxSize from 'popper-max-size-modifier';
import { CSSProperties, MutableRefObject, ReactNode, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

import { Portal } from '@controls/Portal';
import { Stack, stackingOrder } from '@controls/Stack';

import { colors } from '@scripts/colors';

type RefElement = HTMLElement | null;

export type Position = BasePlacement | VariationPlacement;

type PopperModifier = {
  name: string;
  options: Obj;
};

export type PopoverProps = {
  /**
   * Управление состоянием поповера (открыт/закрыт)
   */
  open: boolean;

  /**
   * Элемент, относительного которого появляется поповер
   */
  anchorElement: RefElement;

  /**
   * Использовать ширину родительского элемента
   */
  useAnchorWidth?: boolean;

  /**
   * Позиционирование поповера
   */
  position?: Position;

  /**
   * Запрещает поповеру менять свою позицию.
   * Например, если места снизу недостаточно,то он все равно будет показан снизу
   */
  preventFlip?: boolean;

  /**
   * Запрещает поповеру менять свою позицию, если он не влезает в видимую область.
   */
  preventOverflow?: boolean;

  /**
   *  Позволяет поповеру подствраивать свою высоту под границы экрана, если из-за величины контента он выходит за рамки видимой области экрана
   */
  availableHeight?: boolean;

  /**
   * Если `true`, будет отрисована стрелочка
   */
  withArrow?: boolean;

  /**
   * Смещение поповера.
   * Если позиционирование top, bottom, то [x, y].
   * Если позиционирование left, right то [y, x].
   */
  offset?: [number, number];

  /**
   * Дополнительный стилб для поповера
   */
  popperCSS?: CSSObject;

  /**
   * Дополнительный стиль для стрелочки
   */
  arrowCSS?: CSSObject;

  /**
   * Функция, возвращающая контейнер, в который будет рендериться поповер
   */
  getPortalContainer?: () => HTMLElement;

  /**
   * CSSTransitionProps, прокидываются в компонент CSSTransitionProps.
   */
  transition?: CSSTransitionProps;

  /**
   * Выставляет кастомное свойство transition-duration
   */
  transitionDuration?: CSSProperties['transitionDuration'];

  /**
   * Рендерит компонент, обернутый в Transition
   */
  withTransition?: boolean;

  /**
   * Идентификатор для систем автоматизированного тестирования
   */
  dataTestId?: string;

  /**
   * Хранит функцию, с помощью которой можно обновить положение компонента
   */
  update?: MutableRefObject<() => void>;

  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * z-index компонента
   */
  zIndex?: number;

  /**
   * Если поповер не помещается в переданной позиции (position), он попробует открыться в другой позиции,
   * по очереди для каждой позиции из этого списка.
   * Если не передавать, то поповер открывается в противоположном направлении от переданного position.
   */
  fallbackPlacements?: Position[];

  /**
   * Контент
   */
  children?: ReactNode;
};

const DEFAULT_TRANSITION = {
  timeout: 150,
};

/**
 * Минимальный размер anchorElement,
 * при котором возможно смещение стрелочки относительно центра
 */
const MIN_ARROW_SHIFT_SIZE = 75;

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
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
      open,
      dataTestId,
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
    const [arrowShift, setArrowShift] = useState(false);

    const updatePopperRef = useRef<() => void>();

    const availableHeightContainer = useRef<HTMLDivElement | null>(null);

    const availableHieghtModifier = useMemo(
      () => ({
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
          // const content = availableHeightContainer.current;

          if (content && !content.style.maxHeight) {
            content.style.maxHeight = `${height}px`;
          }
        },
      }),
      []
    );

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
    }, [
      offset,
      withArrow,
      preventFlip,
      fallbackPlacements,
      preventOverflow,
      availableHeight,
      arrowElement,
      availableHieghtModifier,
    ]);

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

    if (update && !update.current && updatePopper) {
      // eslint-disable-next-line no-param-reassign
      update.current = updatePopper;
    }

    useEffect(() => {
      // Dirty hack to force popover to fit the anchor position
      const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
      const observer = new ResizeObserver(() => {
        const event = new MouseEvent('mouseover', {
          bubbles: true,
          cancelable: false,
          view: window,
        });

        anchorElement?.dispatchEvent(event);
        updatePopperRef.current?.();
      });

      if (anchorElement) {
        observer.observe(anchorElement);
      }

      return () => {
        observer.disconnect();
      };
    }, [anchorElement]);

    /**
     * По дизайну, если у тултипа позиционирование -start/-end, то стрелочка немного сдвигается вбок.
     * Но если anchorElement слишком маленький, то стрелочка сдвигаться не должна.
     */
    useEffect(() => {
      const shiftedPosition = position.includes('-start') || position.includes('-end');

      if (shiftedPosition && referenceElement) {
        const { width, height } = referenceElement.getBoundingClientRect();

        const size = position.includes('left') || position.includes('right') ? height : width;

        if (size >= MIN_ARROW_SHIFT_SIZE) {
          setArrowShift(true);
        }
      }
    }, [referenceElement, position]);

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
        data-test-id={dataTestId}
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
                  border: `1px solid ${colors.primary}`,
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
                ...(arrowShift && {
                  "[data-popper-placement='bottom-start'] &": {
                    ':after': {
                      left: -17,
                    },
                  },
                  "[data-popper-placement='left-start'] &": {
                    ':after': {
                      top: -7,
                    },
                  },
                  "[data-popper-placement='left-end'] &": {
                    ':after': {
                      top: -5,
                    },
                  },
                  "[data-popper-placement='bottom-end'] &": {
                    ':after': {
                      left: 5,
                    },
                  },
                }),
                ...arrowCSS,
              }}
            />
          )}
        </div>
      </div>
    );

    const handleEnter = (...args: [HTMLElement, boolean]) => {
      const [instance] = args;
      instance.style.animation = `fadeIn ${transition.timeout}ms ease`;
      instance.style.opacity = '1';
    };

    const handleExit = (...args: [HTMLElement]) => {
      const [instance] = args;
      instance.style.animation = `fadeOut ${transition.timeout}ms ease`;
      instance.style.opacity = '0';
    };

    return (
      <Stack value={zIndex}>
        {computedZIndex => (
          <Portal getPortalContainer={getPortalContainer}>
            {withTransition ? (
              <CSSTransition
                in={open}
                unmountOnExit
                css={{
                  ...(!open && { opacity: 0 }),
                  '@keyframes fadeIn': {
                    '0%': {
                      opacity: 0,
                    },
                    '100%': {
                      opacity: 1,
                    },
                  },
                  '@keyframes fadeOut': {
                    '0%': {
                      opacity: 1,
                    },
                    '100%': {
                      opacity: 0,
                    },
                  },
                }}
                onEnter={handleEnter}
                onExit={handleExit}
                {...transition}
              >
                {renderContent(computedZIndex, { transitionDuration })}
              </CSSTransition>
            ) : (
              open && renderContent(computedZIndex)
            )}
          </Portal>
        )}
      </Stack>
    );
  }
);

export default Popover;
