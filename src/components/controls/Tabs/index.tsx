import { CSSObject } from '@emotion/react';
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import cn from 'classnames';
// import deepmerge from "deepmerge";
import {
  Children,
  FC,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
  useId,
} from 'react';
import { Tabs as ReactTabs } from 'react-tabs';

import TabsList, { TabsListProps } from './List';
import TabsPanel, { TabsPanelProps } from './Panel';
import TabsTab, { TabsTabProps } from './Tab';

export interface TabsCompositionProps {
  List: FC<TabsListProps>;
  Tab: FC<TabsTabProps>;
  Panel: FC<TabsPanelProps>;
}

export interface TabsProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onSelect' | 'size'> {
  /** Tabs.List and Tabs.Panel components */
  children: ReactNode;
  /** Initially opened tab in uncontrolled mode */
  defaultIndex?: number;
  /** Currently opened tab in controlled mode */
  selectedIndex?: number;
  /** Tab select handler */
  onSelect?: (index: number, last: number, event: Event) => boolean | void;
  /** Tab list styles */
  tabListCSS?: CSSObject;
  panelCSS?: CSSObject;

  panelFillsHeight?: boolean;
  forceRenderTabPanel?: boolean;
}

export const Tabs: FC<TabsProps> & TabsCompositionProps = ({
  children,
  className,
  tabListCSS,
  panelCSS,
  panelFillsHeight,
  ...props
}) => {
  const id = useId();
  const convertedId = id.replace(/:/g, '_');
  const baseClass = `tabs-${convertedId}`;
  const classes = cn(baseClass, className);

  const tabCSS: CSSObject = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      whiteSpace: 'nowrap',
      cursor: 'pointer',

      maxHeight: scale(6) - 1,
      padding: scale(2),
      borderBottomWidth: 3,
      marginBottom: 0,
      marginRight: scale(1),

      svg: {
        marginRight: scale(1),
      },

      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderStyle: 'solid',
      borderBottomColor: 'transparent',
      transition: 'border-bottom-color 0.2s ease',

      '&.selected': {
        cursor: 'default',
        borderBottomColor: colors.link,
        color: colors?.link,
        fill: colors?.link,
      },

      color: colors?.black,

      ':hover': {
        color: colors?.link,
        fill: colors?.link,
      },
    }),
    [],
  );

  return (
    <ReactTabs
      className={classes}
      {...props}
      css={{
        [`.${baseClass}`]: {
          '&__list': {
            display: 'flex',
            borderBottom: `1px solid ${colors.grey200}`,
            height: scale(6),
            flexShrink: 0,
            ...tabListCSS,
          },
          '&__tab': tabCSS,
          '&__panel': {
            display: 'none',
            ...(panelFillsHeight && {
              height: '100%',
            }),
            paddingTop: scale(2),

            ...panelCSS,

            '&.selected': { display: 'block' },
          },
        },
      }}
    >
      {children &&
        Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement<any>(child, {
              baseClass,
            });
          }
        })}
    </ReactTabs>
  );
};
(TabsList as any).tabsRole = 'TabList';
(TabsTab as any).tabsRole = 'Tab';
(TabsPanel as any).tabsRole = 'TabPanel';

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

export default Tabs;
