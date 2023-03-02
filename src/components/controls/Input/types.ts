import { CSSObject } from '@emotion/react';
import { ChangeEvent, InputHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';

import { FormControlProps } from '../FormControl';

export type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'onMouseDown' | 'enterKeyHint'
> & {
    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Начальное значение поля
     */
    defaultValue?: string;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Крестик для очистки поля
     */
    clear?: boolean;

    theme?: FormControlProps['theme'] | keyof FormControlProps['theme'];
    variant?: FormControlProps['variant'];
    size?: FormControlProps['size'];
    labelWrap?: FormControlProps['labelWrap'];

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Отображение иконки успеха
     */
    success?: boolean;

    /**
     * Текст подсказки
     */
    hint?: ReactNode;

    /**
     * Лейбл компонента
     */
    label?: ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Атрибут type
     */
    type?: 'number' | 'card' | 'email' | 'money' | 'password' | 'tel' | 'text' | 'time';

    /**
     * Ref для обертки input
     */
    wrapperRef?: Ref<HTMLDivElement>;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот под инпутом
     */
    bottomAddons?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный стиль для поля
     */
    fieldCSS?: CSSObject;

    /**
     * Дополнительный стиль инпута
     */
    inputCSS?: CSSObject;

    /**
     * Дополнительный стиль для лейбла
     */
    labelCSS?: CSSObject;

    /**
     * Дополнительный стиль для аддонов
     */
    leftAddonsCSS?: CSSObject;
    rightAddonsCSS?: CSSObject;

    /**
     * Обработчик поля ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;

    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик клика по полю
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик MouseDown по полю
     */
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик MouseUp по полю
     */
    onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
};
