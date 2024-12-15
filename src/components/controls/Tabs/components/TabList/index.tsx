import { useEffect, useMemo, useRef } from 'react';

import { useTabsTheme } from '../../context';
import { useMedia } from '../../hooks/useMedia';
import { useTablistTitles } from '../../hooks/useTablistTitles';
import { createSyntheticMouseEvent } from '../../synthetic-events';
import type { ShowMoreButtonOption, TabListProps, TabsMatchMedia } from '../../types';
import { KeyboardFocusable } from '../KeyboardFocusable';
import { ScrollableContainer } from '../ScrollableContainer';
import { ShowMoreButton as DefaultTooltipButton } from '../ShowMore';
import { Title } from '../Title';

export const TabList = ({
  ShowMoreButton: TooltipButton = DefaultTooltipButton,
  className,
  containerCSS,
  titles = [],
  selectedId = titles.length ? titles[0].id : undefined,
  scrollable: propsScrollable = true,
  collapsible: propsCollapsible,
  collapsedTabsIds,
  onChange,
  dataTestId,
  breakpoint = 1024,
  children,
}: TabListProps) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [view] = useMedia<TabsMatchMedia>([['desktop', `(min-width: ${breakpoint}px)`]], 'desktop');

  const scrollable = view === 'desktop' ? propsScrollable : true;
  const collapsible = view === 'desktop' ? propsCollapsible : false;

  const { containerRef, addonRef, tablistTitles, selectedTab, focusedTab, getTabListItemProps } = useTablistTitles({
    titles,
    selectedId,
    collapsible,
    collapsedTabsIds,
    breakpoint,
    onChange,
  });

  useEffect(() => {
    if (selectedTab && lineRef.current) {
      lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
      lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
    }
  }, [selectedTab, tablistTitles]);

  const collapsedOptions = useMemo(
    () =>
      tablistTitles.reduce<ShowMoreButtonOption[]>((options, title) => {
        if (title.collapsed) {
          options.push({
            key: title.title,
            value: title.id,
            content: <Title {...title} isOption />,
          });
        }

        return options;
      }, []),
    [tablistTitles]
  );

  const handleOptionsChange = ({ selected }: { selected: any }) => {
    if (selected?.value && onChange) {
      const nativeMouseEvent = new MouseEvent('change');
      const syntheticMouseEvent = createSyntheticMouseEvent(nativeMouseEvent);

      onChange(syntheticMouseEvent, { selectedId: selected?.value });
    }
  };

  const { getCSS } = useTabsTheme();

  const collapsedCount = tablistTitles.filter(title => title.collapsed).length;

  const renderContent = () => (
    <div role="tablist" data-test-id={dataTestId} className={className} css={getCSS('tabList') as any} ref={wrapperRef}>
      {tablistTitles.map((title, index) => (
        <KeyboardFocusable key={title.id}>
          {(ref, focused) =>
            title.renderTitle ? (
              title.renderTitle({
                ...getTabListItemProps(index, ref),
                ...title,
                focused,
              })
            ) : (
              <Title {...getTabListItemProps(index, ref)} {...title} focused={focused} />
            )
          }
        </KeyboardFocusable>
      ))}

      {collapsedOptions.length ? (
        <div ref={addonRef} role="tablist">
          <TooltipButton
            options={collapsedOptions}
            onChange={handleOptionsChange}
            count={collapsedCount}
            data-collapse="true"
          />
        </div>
      ) : null}

      <div css={getCSS('line') as any} ref={lineRef} />

      {children}
    </div>
  );

  return scrollable && !collapsible ? (
    <ScrollableContainer activeChild={focusedTab || selectedTab} containerCSS={containerCSS}>
      {renderContent()}
    </ScrollableContainer>
  ) : (
    <div
      ref={containerRef}
      css={{
        overflow: 'hidden',
        ...containerCSS,
      }}
    >
      {renderContent()}
    </div>
  );
};
