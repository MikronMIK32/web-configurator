import { FC, MouseEvent, useId, useMemo, useState } from 'react';

import { Breakpoints, MEDIA_QUERIES } from '@scripts/media';

import { Tab } from './components/Tab';
import { TabList as DefaultTabList } from './components/TabList';
import { TabsComponent } from './components/Tabs';
import { LinkTitle } from './components/Title/LinkTitle';
import { TabsThemeProvider } from './context';
import { useMedia } from './hooks/useMedia';
import { TABS_THEMES } from './themes';
import { SelectedId, TabsMatchMedia, TabsProps, TabsState } from './types';

export type { TabsProps };

interface TabsCompositionProps {
  Tab: typeof Tab;
  LinkTitle: typeof LinkTitle;
}

type TabsComponentProps = Omit<TabsProps, 'TabList'> & {
  TabList?: TabsProps['TabList'];
};

const Tabs: FC<TabsComponentProps> & TabsCompositionProps = ({
  TabList = DefaultTabList,
  variant = 'primary',
  size = 'md',
  mobile: mobileProps,
  collapsible,
  fullWidthScroll,
  scrollable,
  onChange,
  selectedId: propsSelectedId,
  theme: themeName = 'basic',
  breakpoint = Breakpoints.md,
  prefix: propsPrefix,
  ...props
}) => {
  const isControlled = typeof propsSelectedId !== 'undefined' && typeof onChange !== 'undefined';
  const theme = typeof themeName === 'string' ? TABS_THEMES[themeName] : themeName;

  const [view] = useMedia<TabsMatchMedia>([['desktop', MEDIA_QUERIES.mdMin]], 'desktop');
  const mobile = typeof mobileProps === 'undefined' ? view === 'mobile' : mobileProps;

  const state = useMemo<TabsState>(
    () => ({
      mobile,
      collapsible,
      fullWidthScroll,
      scrollable,
    }),
    [collapsible, fullWidthScroll, mobile, scrollable]
  );

  const localPrefix = useId();
  const prefix = typeof propsPrefix === 'undefined' ? localPrefix : propsPrefix;

  const [localSelectedId, setLocalSelectedId] = useState<SelectedId>();

  const handleChange = (e: MouseEvent, payload: { selectedId: SelectedId }) => {
    if (isControlled) {
      onChange?.(e, payload);
      return;
    }

    setLocalSelectedId(payload.selectedId);
  };

  const selectedId = isControlled ? propsSelectedId : localSelectedId;

  return (
    <TabsThemeProvider idPrefix={prefix} size={size} state={state} theme={theme} variant={variant}>
      <TabsComponent
        TabList={TabList}
        selectedId={selectedId}
        collapsible={collapsible}
        onChange={handleChange}
        breakpoint={breakpoint}
        {...props}
      />
    </TabsThemeProvider>
  );
};

Tabs.Tab = Tab;
Tabs.LinkTitle = LinkTitle;
Tabs.displayName = 'Tabs';

export default Tabs;
