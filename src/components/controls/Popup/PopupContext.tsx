import { FC, ReactNode, createContext, useContext, useMemo } from 'react';

import { BaseThemeState, useThemeCSSPart } from '@scripts/theme';

import type { PopupSize, PopupState, PopupTheme, PopupThemeState, PopupVariant } from './types';

const useFoo = () => useThemeCSSPart<PopupThemeState, PopupTheme>(...([] as never as [any, any]));

type Context = Required<BaseThemeState<typeof PopupVariant, typeof PopupSize, PopupTheme>> & {
  state: PopupState;
  getCSS: ReturnType<typeof useFoo>;
};

type ContextProps = Required<BaseThemeState<typeof PopupVariant, typeof PopupSize, PopupTheme>> & {
  state: PopupState;
};

const PopupContext = createContext<Context | null>(null);
PopupContext.displayName = 'PopupContext';

export const PopupContextProvider: FC<{ children: ReactNode } & ContextProps> = ({
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
      state,
      size,
      theme,
      variant,
    }),
    [getCSS, size, state, theme, variant]
  );

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
};

export const usePopupContext = () => {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error(`Hook usePopupContext must be used within PopupContextProvider`);
  }

  return context;
};
