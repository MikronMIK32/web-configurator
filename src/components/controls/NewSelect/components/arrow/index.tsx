import { ReactComponent as ArrowIcon } from '@icons/small/chevronUp.svg';
import { useSelectTheme } from '../../context';

import { ArrowProps } from '../../types';

export const Arrow = ({ disabled, className }: ArrowProps) => {
  const {
    getCSS,
    state: { isOpen },
  } = useSelectTheme();

  return (
    <span css={getCSS('arrowButton')}>
      <ArrowIcon
        className={className}
        css={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'transform ease 300ms',
          ...(!isOpen && { transform: 'rotate(180deg)' }),
        }}
      />
    </span>
  );
};
