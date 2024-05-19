import { HTMLProps, forwardRef } from 'react';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';

import CloseIcon from '@icons/small/close.svg?react';

export interface TagProps extends HTMLProps<Omit<HTMLButtonElement, 'type'>> {
  onDelete?: () => void;
}

const Tag = ({ children, onDelete, onClick, tabIndex = onClick ? 0 : -1, ...props }: TagProps, ref: any) => (
  <button
    {...props}
    tabIndex={tabIndex}
    type="button"
    data-role="tag-button"
    ref={ref}
    onClick={onClick}
    css={{
      cursor: onClick ? 'pointer' : 'default',
      padding: `${scale(1, true)}px ${scale(1)}px`,
      overflow: 'hidden',
      height: scale(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.white,
      border: `1px solid ${colors.grey400}`,
      ':hover': {
        background: colors.linkHover,
      },
      color: colors.black,
      ...typography('paragraphSmall'),
    }}
  >
    {children}
    {onDelete && (
      <span
        role="button"
        tabIndex={0}
        css={{ cursor: 'pointer', display: 'flex', flexShrink: 0, flexGrow: 1, ':hover': { opacity: 0.5 } }}
        title="Удалить"
        onClick={e => {
          e.stopPropagation();
          onDelete?.();
        }}
        onKeyDown={event => {
          if ([' ', 'Enter'].includes(event.key)) {
            event.stopPropagation();
            onDelete?.();
          }
        }}
      >
        <CloseIcon
          css={{
            fill: 'currentColor',
            width: scale(2),
            height: scale(2),
            marginLeft: scale(1, true),
          }}
        />
      </span>
    )}
  </button>
);

export default forwardRef(Tag) as typeof Tag;
