import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { DependencyList, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '@scripts/hooks/useIsomorphicLayoutEffect';

export const useCollapsibleElements = <ContainerType extends HTMLElement, AddonType extends HTMLElement>(
    selectors: string,
    deps: DependencyList = []
) => {
    const [idsCollapsedElements, setIdsCollapsedElements] = useState<string[]>([]);

    const containerRef = useRef<ContainerType>(null);
    const addonRef = useRef<AddonType>(null);

    useIsomorphicLayoutEffect(() => {
        const collapseElements = (inlineSize?: number) => {
            const container = containerRef.current;

            if (!container) return;

            const tabList = container.querySelector('[role="tablist"]');

            if (!tabList) {
                console.error('No [role="tablist"] found as descendand of tabs container.');
                return;
            }

            const addon = addonRef.current;
            const moreElements = Array.from(tabList.querySelectorAll('[role="tablist"]')) as HTMLElement[];
            
            const moreElementRect = moreElements.pop()?.getBoundingClientRect();
            const elements = Array.from(container.querySelectorAll(selectors)) as HTMLElement[];
            const containerWidth = (inlineSize || container.clientWidth) - (moreElementRect?.width || 0) * 1.5; // при рассчётах, даём кнопке "Ещё" чуть больше места, чтобы точно влезла

            const collapsedIds = elements.reduce<string[]>((acc, element) => {
                const { offsetLeft, offsetWidth, id } = element;
                const elementOffset = offsetLeft + offsetWidth;
                const isCollapsedElement = getComputedStyle(element).visibility === 'collapse';
                const maxWidth =
                    addon && !isCollapsedElement
                        ? containerWidth - (addon.offsetWidth + parseFloat(getComputedStyle(addon).marginLeft))
                        : containerWidth;
                if (elementOffset >= maxWidth) acc.push(id);

                return acc;
            }, []);

            setIdsCollapsedElements(collapsedIds);
        };

        const handleElementsResize = (entries: ResizeObserverEntry[]) => {
            const [{ inlineSize }] = entries[0].contentBoxSize;

            collapseElements(inlineSize);
        };

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(handleElementsResize);

        if (containerRef.current) {
            collapseElements();
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [selectors, ...deps]);

    return {
        containerRef,
        addonRef,
        idsCollapsedElements,
    };
};
