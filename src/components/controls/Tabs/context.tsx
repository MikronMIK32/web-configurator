import { FC, ReactNode, createContext, useContext, useMemo } from 'react';

import { BaseThemeState, useThemeCSSPart } from '@scripts/theme';

import { TabsSize, TabsState, TabsTheme, TabsThemeState, TabsVariant } from './types';

const useFoo = () => useThemeCSSPart<Omit<TabsThemeState, 'theme'>, TabsTheme>(...([] as never as [any, any]));

type Context = Required<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsTheme>> & {
  state: TabsState;
  getCSS: ReturnType<typeof useFoo>;
  idPrefix: string;
};

type ContextProps = Required<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsTheme>> & {
  idPrefix: string;
  state: TabsState;
};

const TabsThemeContext = createContext<Context | null>(null);
TabsThemeContext.displayName = 'TabsThemeContext';

export const TabsThemeProvider: FC<{ children: ReactNode } & ContextProps> = ({
  idPrefix,
  children,
  size,
  theme,
  variant,
  state,
}) => {
  const getCSS = useThemeCSSPart(theme, {
    ...state,
    size,
    variant,
  });

  const value = useMemo<Context>(
    () => ({
      getCSS,
      idPrefix,
      state,
      size,
      theme,
      variant,
    }),
    [getCSS, size, state, theme, variant, idPrefix]
  );

  return <TabsThemeContext.Provider value={value}>{children}</TabsThemeContext.Provider>;
};

export const useTabsTheme = () => {
  const context = useContext(TabsThemeContext);

  if (!context) {
    throw new Error(`Hook useTabsTheme must be used within TabsThemeProvider`);
  }

  return context;
};
