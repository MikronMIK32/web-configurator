import type { CSSObject } from '@emotion/react';
import type { HTMLProps, MouseEvent, ReactNode } from 'react';
import type { TransitionStatus } from 'react-transition-state';

export interface BackdropProps extends HTMLProps<HTMLDivElement> {
  /**
   * Прозрачный бэкдроп
   */
  invisible?: boolean;

  /**
   * Управляет видимостью компонента
   */
  open: boolean;

  /**
   * Обработчик окончания анимации и уничтожения компонента
   */
  onDestroy?: () => void;

  /**
   * Обработчик клика по бэкдропу
   */
  onClose?: (event: MouseEvent<HTMLElement>) => void;

  /**
   * Класс
   */
  className?: string;

  /**
   * Идентификатор для систем автоматизированного тестирования
   */
  dataTestId?: string;

  /**
   * Дочерние элементы.
   */
  children?: ReactNode;

  /** Время анимации */
  timeout?: number;

  /**
   * Набор стилей для разных состояний (открытие, закрытие)
   */
  styles?: Record<TransitionStatus, CSSObject>;
}
