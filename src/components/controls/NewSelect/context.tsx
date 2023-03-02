import { FC, ReactNode, createContext, useContext, useMemo } from 'react';

import { BaseThemeState, useThemeCSSPart } from '@scripts/theme';

import { SelectSize, SelectState, SelectTheme, SelectThemeState, SelectVariant } from './types';

const useFoo = () => useThemeCSSPart<Omit<SelectThemeState, 'theme'>, SelectTheme>(...([] as never as [any, any]));

type Context = Required<BaseThemeState<typeof SelectVariant, typeof SelectSize, SelectTheme>> & {
  state: SelectState;
  getCSS: ReturnType<typeof useFoo>;
};

type ContextProps = Required<BaseThemeState<typeof SelectVariant, typeof SelectSize, SelectTheme>> & {
  state: SelectState;
};

const SelectThemeContext = createContext<Context | null>(null);
SelectThemeContext.displayName = 'SelectThemeContext';

export const SelectThemeProvider: FC<{ children: ReactNode } & ContextProps> = ({
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

  return <SelectThemeContext.Provider value={value}>{children}</SelectThemeContext.Provider>;
};

export const useSelectTheme = () => {
  const context = useContext(SelectThemeContext);

  if (!context) {
    throw new Error(`Hook useSelectTheme must be used within SelectThemeProvider`);
  }

  return context;
};
