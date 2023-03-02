/* eslint-disable no-use-before-define */
import type { CSSObject } from '@emotion/react';
import {
  AriaAttributes,
  FC,
  FocusEvent,
  HTMLProps,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
  SVGProps,
} from 'react';

import type { PopoverProps } from '@controls/Popover';

import { BaseThemeState, StyleDefinition, ValueOrFunction } from '@scripts/theme';

import type { FormControlProps } from '../FormControl/types';
// eslint-disable-next-line import/no-cycle
import { selectThemes } from './themes';

export enum SelectSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum SelectVariant {
  primary = 'primary',
}

export interface SelectState {
  isOpen: boolean;
  isSearch?: boolean;
  hasSelected?: boolean;
  disabled: boolean;
}

export type SelectThemeState = BaseThemeState<typeof SelectVariant, typeof SelectSize, never> & SelectState;

enum SelectParts {
  optionList,
  arrowButton,
  closeButton,
  optgroup,
  optionListWrapper,
}

export type SelectTheme = ValueOrFunction<
  Record<keyof typeof SelectParts, StyleDefinition<SelectThemeState>> & {
    field: StyleDefinition<SelectThemeState & { isFocused: boolean }>;
    option: StyleDefinition<
      SelectThemeState & {
        isSelected: boolean;
        isHover: boolean;
        isDisabled: boolean;
        isPreloader: boolean;
      }
    >;
  },
  [SelectThemeState]
>;

export type OptionShape = {
  /**
   * Текстовое представление пункта
   */
  key: string;

  /**
   * Контент, который будет отрисован в выпадающем списке и в поле при выборе
   */
  content?: ReactNode;

  /**
   * Блокирует данный пункт для выбора
   */
  disabled?: boolean;

  /**
   * Разрешает показ компонента Checkmark, иногда нужно его убирать для показа контента ошибки или пустого состояния
   */
  showCheckMark?: boolean;

  /**
   * Дополнительные данные
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;

  // Опция-прелоадер
  isPreloader?: boolean;
};

export type GroupShape = {
  /**
   * Заголовок группы
   */
  label?: string;

  /**
   * Дочерние элементы
   */
  options: OptionShape[];
};

export type BaseSelectChangePayload = {
  selected: OptionShape | null;
  selectedMultiple: OptionShape[];
  initiator: OptionShape | null;
  name?: string;
};

export type BaseSelectProps = Partial<
  Omit<BaseThemeState<typeof SelectVariant, typeof SelectSize, SelectTheme>, 'theme'>
> &
  Partial<
    Omit<
      SelectState,
      //   TODO: исключить вычисляемые внутри компонента свойства. эти взяты из FormControl
      'hasInnerLabel' | 'hasError' | 'hasRightAddons' | 'hasLeftAddons'
    >
  > & {
    theme?: SelectTheme | keyof typeof selectThemes;
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Скрывать выбранные опции
     */
    hideSelectedOptions?: boolean;

    /**
     * Вызывать onChange даже когда уже выбрано
     */
    emitChangeOnClick?: boolean;

    /**
     * Дополнительный стиль для поля
     */
    fieldCSS?: CSSObject;

    /**
     * Дополнительный класс выпадающего меню
     */
    optionsListClassName?: string;

    /**
     * Дополнительный класс для пункта меню
     */
    optionClassName?: string;

    /**
     * Дополнительный класс для компонента группы пунктов
     */
    optionGroupClassName?: string;

    /**
     * Дополнительный класс для поповера
     */
    popperClassName?: string;

    /**
     * Список вариантов выбора
     */
    options: Array<OptionShape | GroupShape>;

    /**
     * Атрибут id
     */
    id?: string;

    /**
     * Атрибут name
     */
    name?: string;

    /**
     * Разрешить растягивать компонент по вертикали чтобы уместить field
     */
    wrap?: boolean;

    /**
     * Управление возможностью выбора значения
     */
    disabled?: boolean;

    /**
     * Начальное состояние селекта
     */
    defaultOpen?: boolean;

    /**
     * Управление открытием
     */
    open?: boolean;

    /**
     * Возможность выбрать несколько значений
     */
    multiple?: boolean;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Управляет шириной выпадающего меню.
     * Ширину определяет контент, либо ширина равна ширине поля
     */
    optionsListWidth?: 'content' | 'field';

    /**
     * Лейбл поля
     */
    label?: ReactNode;

    /**
     * Вид лейбла внутри / снаружи. В некоторых дизайнах делают два вида лейблов
     */
    labelView?: 'inner' | 'outer';

    /**
     * Плейсхолдер поля
     */
    placeholder?: string;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Подсказка под полем
     */
    hint?: ReactNode;

    /**
     * Возможность использовать селект как input-autocomplete
     */
    autocomplete?: boolean;

    /**
     * Позволяет снять выбранное значение
     */
    allowUnselect?: boolean;

    /**
     * Только для мобильной версии. Сбрасывать поле при нажатии на Отмена.
     */
    clearOnCancel?: boolean;

    /**
     * Закрывать меню после выбора?
     */
    closeOnSelect?: boolean;

    /**
     * При навигации с клавиатуры переходить от последнего пункта меню к первому и наоборот.
     */
    circularNavigation?: boolean;

    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean;

    /**
     * Список value выбранных пунктов (controlled-селект)
     */
    selected?: Array<string | OptionShape> | string | OptionShape | null;

    /**
     * Позиционирование выпадающего списка
     */
    popoverPosition?: PopoverProps['position'];

    /**
     * Количество видимых пунктов меню (5 = 5.5)
     */
    visibleOptions?: number;

    /**
     * Кастомный рендер выбранного пункта
     */
    valueRenderer?: ({
      selected,
      selectedMultiple,
    }: {
      selected?: OptionShape;
      selectedMultiple: OptionShape[];
    }) => ReactNode;

    /**
     * Компонент стрелки
     */
    Arrow?: FC<ArrowProps> | null | false;

    /**
     * Компонент поля
     */
    Field?: FC<FieldProps>;

    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: any;

    /**
     * Пропсы, которые будут прокинуты в компонент списка
     */
    optionsListProps?: any;

    /**
     * Пропсы, которые будут прокинуты в компонент пункта меню
     */
    optionProps?: unknown;

    /**
     * Компонент выпадающего меню
     */
    OptionsList?: FC<OptionsListProps>;

    /**
     * Компонент группы
     */
    Optgroup?: FC<OptgroupProps>;

    /**
     * Компонент пункта меню
     */
    Option?: FC<OptionProps>;

    /**
     * Обработчик выбора
     */
    onChange?: (payload: BaseSelectChangePayload) => void;

    /**
     * Обработчик открытия\закрытия селекта
     */
    onOpen?: (payload: { open?: boolean; name?: string }) => void;

    /**
     * Обработчик фокуса поля
     */
    onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик блюра поля
     */
    onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик скрола
     */
    onScroll?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Хранит функцию, с помощью которой можно обновить положение поповера
     */
    updatePopover?: PopoverProps['update'];

    /**
     * z-index поповера
     */
    zIndexPopover?: PopoverProps['zIndex'];

    /**
     * Показывать OptionsList, если он пустой
     */
    showEmptyOptionsList?: boolean;
  };

export type FieldProps = {
  id?: string;
  rightAddons?: FormControlProps['rightAddons'];
  rightAddonsCSS?: FormControlProps['rightAddonsCSS'];

  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * Выбранный пункт
   */
  selected?: OptionShape;

  /**
   * Список выбранных пунктов
   */
  selectedMultiple?: OptionShape[];

  /**
   * Метод для ручной установки выбранных пунктов
   */
  setSelectedItems: (selected: OptionShape[]) => void;

  /**
   * Метод переключающий видимость выпадающего списка
   */
  toggleMenu: () => void;

  /**
   * Флаг, можно ли выбрать несколько значений
   */
  multiple?: boolean;

  /**
   * Флаг, что есть пользовательский ввод
   */
  autocomplete?: boolean;

  /**
   * Флаг, открыто ли меню
   */
  open?: boolean;

  /**
   * Флаг, поле заблокировано
   */
  disabled?: boolean;

  /**
   * Лейбл поля
   */
  label?: ReactNode;

  wrap?: boolean;
  labelView?: 'inner' | 'outer';

  /**
   * Пропы лейбла из downshift
   */
  labelProps?: HTMLProps<HTMLLabelElement>;

  /**
   * Плейсхолдер поля
   */
  placeholder?: string;

  //   TODO: form stuff
  /** Formik meta object (inner) */
  //   meta?: FieldMetaProps<any>;

  /**
   * Подсказка под полем
   */
  hint?: ReactNode;

  error?: string;

  /**
   * Компонент стрелки
   */
  Arrow?: ReactElement | false | null;

  /**
   * Кастомный рендер выбранного пункта
   */
  valueRenderer?: BaseSelectProps['valueRenderer'];

  /**
   * Внутренние свойства, которые должны быть установлены компоненту.
   */
  innerProps: {
    onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
    onClick?: (event: MouseEvent<HTMLDivElement | HTMLInputElement>) => void;
    tabIndex: number;
    id: string;
  } & RefAttributes<HTMLDivElement | HTMLInputElement> &
    AriaAttributes;
};

export type ArrowProps = {
  /**
   * Дополнительный класс
   */
  className?: string;

  disabled?: boolean;
};

export type OptionsListProps = {
  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * Дополнительный класс для компонента группы пунктов
   */
  optionGroupClassName?: string;

  /**
   * Дополнительный стиль для компонента группы пунктов
   */
  optionGroupCSS?: CSSObject;

  /**
   * Компонент пункта меню
   */
  Option: FC<OptionProps>;

  /**
   * Функция для получения пропсов для ячейки
   */
  getOptionProps: (option: OptionShape, index: number) => OptionProps;

  /**
   * Список выбранных пунктов
   */
  selectedItems?: OptionShape[];

  /**
   * Метод для ручной установки выбранных пунктов
   */
  setSelectedItems: (selected: OptionShape[]) => void;

  /**
   * Метод переключающий видимость выпадающего списка
   */
  toggleMenu: () => void;

  /**
   * Контент шапки
   */
  header?: ReactNode;

  /**
   * Контент футера
   */
  footer?: ReactNode;

  /**
   * Список вариантов выбора
   */
  options?: Array<OptionShape | GroupShape>;

  /**
   * Плоский список пунктов меню (например, нужно для виртуализации)
   */
  flatOptions?: OptionShape[];

  /**
   * Индекс выделенного пункта
   */
  highlightedIndex?: number;

  /**
   * Флаг, открыто ли меню
   */
  open?: boolean;

  /**
   * Компонент группы
   */
  Optgroup?: BaseSelectProps['Optgroup'];

  /**
   * Будет отображаться, если компонент пустой
   */
  emptyPlaceholder?: ReactNode;

  /**
   * Количество видимых пунктов меню (5 = 5.5)
   */
  visibleOptions?: number;

  /**
   * Обработчик скрола
   */
  onScroll?: (event: MouseEvent<HTMLUListElement>) => void;

  /**
   * Дополнительные пропсы для Input'a, находящегося внутри кастомного OptionsList
   */
  inputProps?: HTMLProps<HTMLInputElement>;

  /**
   * Нужно ли показывать футер
   */
  showFooter?: boolean;

  /**
   * Обработчик подтверждения изменений
   */
  onApply?: () => void;

  /**
   * Обработчик отмены изменений
   */
  onClear?: () => void;
};

export type OptgroupProps = {
  /**
   * Дополнительный класс для компонента группы пунктов
   */
  className?: string;

  /**
   * Заголовок группы
   */
  label?: string;

  /**
   * Дочерние элементы
   */
  children?: ReactNode;
};

export type OptionProps = {
  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * Тема
   */
  isMobile?: boolean;

  /**
   * Контент пункта меню
   */
  children?: ReactNode;

  /**
   * Данные пункта меню
   */
  option: OptionShape;

  /**
   * Индекс пункта
   */
  index: number;

  /**
   * Флаг, выбран ли данный пункт
   */
  selected?: boolean;

  /**
   * Флаг, подсвечен ли данный пункт
   */
  highlighted?: boolean;

  /**
   * Флаг, заблокирован ли данный пункт
   */
  disabled?: boolean;

  /**
   * Флаг множественного выбора
   */
  multiple?: boolean;

  /**
   * Компонент пункта меню
   */
  Checkmark?: FC<CheckmarkProps> | null;

  /**
   * Внутренние свойства, которые должны быть установлены компоненту.
   */
  innerProps: {
    id: string;
    onClick: (event: MouseEvent<HTMLLIElement>) => void;
    onMouseDown: (event: MouseEvent<HTMLLIElement>) => void;
    onMouseMove: (event: MouseEvent<HTMLLIElement>) => void;
    role: string;
  } & RefAttributes<HTMLLIElement> &
    AriaAttributes;
};

export type CheckmarkProps = {
  /**
   * Флаг, данный пункт выбран
   */
  selected?: boolean;

  /**
   * Флаг, данный пункт задизейблен
   */
  disabled?: boolean;

  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * Флаг множественного выбора
   */
  multiple?: boolean;

  /**
   * Расположение отметки
   */
  position?: 'before' | 'after';

  /**
   * Иконка выбранного пункта
   */
  icon?: FC<SVGProps<SVGSVGElement>>;

  checkboxCSS?: CSSObject;
};
