import { FC, useEffect, useRef } from 'react';
import { useTransition } from 'react-transition-state';

import type { BackdropProps } from './types';

const Backdrop: FC<BackdropProps> = ({
  className,
  open = false,
  invisible = false,
  timeout = 200,
  children,
  onClose,
  dataTestId,
  onDestroy,
  styles = {
    preEnter: {
      backgroundColor: 'transparent',
      transition: `background-color ${timeout}ms ease-in`,
    },
    entering: {
      backgroundColor: 'transparent',
      transition: `background-color ${timeout}ms ease-in`,
    },
    entered: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      transition: `background-color ${timeout}ms ease`,
    },
    exiting: {
      backgroundColor: 'transparent',
      transition: `background-color ${timeout}ms ease-out`,
    },
    exited: {
      backgroundColor: 'transparent',
    },
  },
  ...restProps
}) => {
  const [{ isMounted, status }, toggle] = useTransition({
    timeout,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  useEffect(() => {
    toggle(open);
  }, [open]);

  const onDestroyRef = useRef(onDestroy);
  onDestroyRef.current = onDestroy;

  useEffect(() => {
    if (!isMounted) onDestroyRef.current?.();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden
      onClick={onClose}
      data-test-id={dataTestId}
      className={className}
      css={{
        zIndex: -1,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        WebkitTapHighlightColor: 'transparent',
        ...(invisible && { opacity: 0 }),
        ...styles[status],
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Backdrop;
