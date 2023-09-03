import { CSSObject } from '@emotion/react';
import { ReactNode } from 'react';

import type { BaseModalProps } from '@controls/BaseModal';

import { LayoutProps } from '@components/Layout';

import { BaseThemeState, StyleDefinition, ValueOrFunction } from '@scripts/theme';

// eslint-disable-next-line import/no-cycle
import { popupThemes } from './themes';

export enum PopupSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  screen_lg = 'screen_lg',
  fullscreen = 'fullscreen',
  minSm = 'minSm',
  minMd = 'minMd',
  minLg = 'minLg',
}

export enum PopupVariant {
  primary = 'primary',
}

export type View = 'desktop' | 'mobile';

export type Align = 'left' | 'center' | 'right';

export interface PopupState {
  /**
   * Растягивает контент на всю высоту
   */
  flex?: boolean;

  /**
   * Скроллбар в контенте вместо компонента
   */
  innerScroll?: boolean;

  /**
   * Фиксирует футер
   */
  stickyFooter?: boolean;

  /**
   * Фиксирует шапку
   */
  stickyHeader?: boolean;

  /**
   * Выравнивание заголовка
   */
  align?: Align;

  /**
   * Наличие компонента крестика
   */
  hasCloser?: ReactNode;

  /**
   * Обрезать ли заголовок
   */
  trim?: boolean;

  /**
   * Мобильный или десктопный вид
   */
  view?: View;

  /**
   * Фиксирует позицию модального окна после открытия,
   * предотвращая скачки, если контент внутри будет меняться
   */
  fixedPosition?: boolean;

  /**
   * Состояние загрузки, перезаписывающее контент попапа
   */
  isLoading?: boolean;
}

export type PopupThemeState = BaseThemeState<typeof PopupVariant, typeof PopupSize> & PopupState;

export type PopupTheme = ValueOrFunction<
  {
    wrapper: StyleDefinition<PopupThemeState>;
    component: StyleDefinition<PopupThemeState>;
    header: StyleDefinition<PopupThemeState & { offset?: number; hasContent?: boolean; highlighted?: boolean }>;
    headerContent: StyleDefinition<PopupThemeState>;
    headerCloser: StyleDefinition<PopupThemeState>;
    headerTitle: StyleDefinition<PopupThemeState>;
    content: StyleDefinition<PopupThemeState>;
    footer: StyleDefinition<PopupThemeState & { highlighted?: boolean }>;
  },
  [PopupThemeState]
>;

export type ContentProps = {
  /**
   * Контент
   */
  children?: ReactNode;

  /**
   * Дополнительный класс
   */
  className?: string;
};

export type FooterProps = LayoutProps<'grid'> & {
  /**
   * Контент футера
   */
  children?: ReactNode;

  /**
   * Дополнительный класс
   */
  className?: string;
};

export type HeaderProps = {
  /**
   * Контент шапки
   */
  children?: ReactNode;

  /**
   * Слот слева
   */
  leftAddons?: ReactNode;

  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * Дополнительный стиль для аддонов
   */
  addonCSS?: CSSObject;

  /**
   * Дополнительный стиль для контента
   */
  contentCSS?: CSSObject;

  /**
   * Заголовок шапки
   */
  title?: string;
};

export interface CommonPopupProps
  extends Partial<Omit<BaseThemeState<typeof PopupVariant, typeof PopupSize, PopupTheme>, 'theme'>>,
    Partial<PopupState>,
    BaseModalProps {
  theme?: PopupTheme | keyof typeof popupThemes;
}

export type ModalDesktopProps = CommonPopupProps & {
  /**
   * Ширина модального окна
   * @default "md"
   */
  size?: PopupSize | keyof typeof PopupSize;
};

export type ModalMobileProps = Omit<ModalDesktopProps, 'size' | 'fixedPosition'>;

export type ModalResponsiveProps = ModalDesktopProps & {
  /**
   * Контрольная точка, с нее начинается desktop версия
   * @default 1024
   */
  breakpoint?: number;
};
