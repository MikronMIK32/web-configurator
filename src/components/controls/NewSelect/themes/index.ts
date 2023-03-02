import { SelectTheme } from '../types';
import { basicTheme } from './basic';

enum Themes {
  basic = 'basic',
}

export const selectThemes: Record<keyof typeof Themes, SelectTheme> = {
  basic: basicTheme,
};
