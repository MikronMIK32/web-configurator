/* eslint-disable import/no-cycle */
import { scale } from '@scripts/helpers';

import { TabsTheme } from '../../types';
import { basicTheme } from '../basic';
import { toggle } from './toggle';

export const secondaryTheme: TabsTheme = {
  ...basicTheme,
  line: {
    position: 'absolute',
    opacity: 0,
  },
  scrollableContainer(state) {
    return {
      ...(typeof basicTheme.scrollableContainer === 'function'
        ? basicTheme.scrollableContainer(state)
        : basicTheme.scrollableContainer),
      padding: scale(1),
      margin: -scale(1),
      marginBottom: 0,
      paddingBottom: 0,
    };
  },
  tabList(state) {
    return {
      ...(typeof basicTheme.tabList === 'function' ? basicTheme.tabList(state) : basicTheme.tabList),
      gap: scale(1),
      paddingBottom: scale(3, true),
      ...(state.scrollable && {
        ':before': {},
      }),
    };
  },
  toggle,
  showMoreButton(state) {
    return {
      ...(typeof toggle === 'function' ? toggle(state) : toggle),
    };
  },
};
