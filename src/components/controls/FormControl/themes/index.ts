import { FormControlTheme } from '../types';
import { basicTheme } from './basic';
import { outlineTheme } from './outline';

enum Themes {
    basic = 'basic',
    outline = 'outline',
}

export const formControlThemes: Record<keyof typeof Themes, FormControlTheme> = {
    basic: basicTheme,
    outline: outlineTheme,
};
