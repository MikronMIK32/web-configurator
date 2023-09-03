import { CSSObject } from '@emotion/react';
import { compute as computeScrollIntoView } from 'compute-scroll-into-view';
import { ReactNode, useEffect, useRef } from 'react';

import { useTabsTheme } from '../../context';

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExtraScrollValue = (_: Element) => 40;

export type ScrollableContainerProps = {
    /**
     * Дополнительный класс контейнера
     */
    containerCSS?: CSSObject;

    /**
     * Дочерние компоненты
     */
    children: ReactNode;

    /**
     * Активный элемент (всегда будет в видимой области)
     */
    activeChild: HTMLElement | null;
};

export const ScrollableContainer = ({ containerCSS, children, activeChild }: ScrollableContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeChild) {
            const actions = computeScrollIntoView(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
                boundary: containerRef.current,
            });

            actions.forEach(({ el, left }, index) => {
                if (index === 0) return;
                // eslint-disable-next-line no-param-reassign
                el.scrollLeft = el.scrollLeft > left ? left - getExtraScrollValue(el) : left + getExtraScrollValue(el);
            });
        }
    }, [activeChild]);

    const { getCSS } = useTabsTheme();

    return (
        <div
            css={{
                ...(getCSS('scrollableContainer') as any),
                ...containerCSS,
            }}
            ref={containerRef}
        >
            {children}
        </div>
    );
};

ScrollableContainer.displayName = 'ScrollableContainer';
