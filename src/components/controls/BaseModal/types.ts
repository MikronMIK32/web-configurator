import { CSSObject } from '@emotion/react';
import type { FC, KeyboardEvent, MouseEvent, MutableRefObject, ReactNode, Ref } from 'react';
import type { TransitionStatus } from 'react-transition-state';

import type { BackdropProps } from '../Backdrop/types';
import type { PortalProps } from '../Portal';

export type BaseModalProps = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Компонент бэкдропа
     */
    Backdrop?: FC<BackdropProps>;

    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: Partial<BackdropProps> & Record<string, unknown>;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: PortalProps['getPortalContainer'];

    /**
     * Отключает автоматический перевод фокуса на модалку при открытии
     * @default false
     */
    disableAutoFocus?: boolean;

    /**
     * Отключает ловушку фокуса
     * @default false
     */
    disableFocusLock?: boolean;

    /**
     * Отключает восстановление фокуса на предыдущем элементе после закрытия модалки
     * @default false
     */
    disableRestoreFocus?: boolean;

    /**
     * Отключает вызов `callback` при нажатии Escape
     * @default false
     */
    disableEscapeKeyDown?: boolean;

    /**
     * Отключает вызов `callback` при клике на бэкдроп
     * @default false
     */
    disableBackdropClick?: boolean;

    /**
     * Отключает блокировку скролла при открытии модального окна
     * @default false
     */
    disableBlockingScroll?: boolean;

    /**
     * Содержимое модалки всегда в DOM
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный стиль контента
     */
    contentCSS?: CSSObject;

    /**
     * Дополнительный стиль для обертки (Modal)
     */
    wrapperCSS?: CSSObject;

    /**
     * Обработчик скролла контента
     */
    scrollHandler?: 'wrapper' | 'content' | MutableRefObject<HTMLDivElement | null>;

    /**
     * Обработчик события нажатия на бэкдроп
     */
    onBackdropClick?: (event: MouseEvent) => void;

    /**
     * Обработчик события нажатия на Escape
     *
     * Если `disableEscapeKeyDown` - false и модальное окно в фокусе
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;

    /**
     * Обработчик закрытия
     */
    onClose?: (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
        reason?: 'backdropClick' | 'escapeKeyDown' | 'closerClick'
    ) => void;

    /**
     * Обработчик события onEntered компонента Transition
     */
    onMount?: () => void;

    /**
     * Обработчик события onExited компонента Transition
     */
    onUnmount?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Реф, который должен быть установлен компонентной области
     */
    componentRef?: MutableRefObject<HTMLDivElement | null>;

    timeout?: number;

    /**
     * Набор стилей для разных состояний (открытие, закрытие)
     */
    styles?: Partial<Record<TransitionStatus, CSSObject>>;

    /**
     * ID для родительского элемента
     */
    id?: string;
};

export type BaseModalContextType = {
    hasFooter?: boolean;
    hasHeader?: boolean;
    hasScroll?: boolean;
    headerHighlighted?: boolean;
    footerHighlighted?: boolean;
    headerOffset?: number;
    setHeaderOffset: (offset: number) => void;
    contentRef: Ref<HTMLElement>;
    setHasHeader: (exists: boolean) => void;
    setHasFooter: (exists: boolean) => void;
    onClose: Required<BaseModalProps>['onClose'];
};
