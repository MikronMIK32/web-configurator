import { FC, HTMLProps, ReactNode, useMemo } from 'react';
import { SVGRIcon } from '@customTypes/index';

import { ReactComponent as EditIcon } from '@icons/small/edit.svg';
import { ReactComponent as ExportIcon } from '@icons/small/share.svg';
import { ReactComponent as CopyIcon } from '@icons/small/copy.svg';
import { ReactComponent as TrashIcon } from '@icons/small/delete.svg';

import { scale } from '@scripts/helpers';
import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

export interface ContentBtnProps extends HTMLProps<HTMLButtonElement> {
  type?: 'edit' | 'copy' | 'export' | 'delete';
  children: ReactNode;
  Icon?: SVGRIcon;
}

export const ContentBtn: FC<ContentBtnProps> = ({
  type,
  children,
  Icon,
  ...props
}) => {
  const IconComponent = useMemo(() => {
    if (Icon) return Icon;

    switch (type) {
      case 'copy':
        return CopyIcon;
      case 'export':
        return ExportIcon;
      case 'delete':
        return TrashIcon;
      case 'edit':
        return EditIcon;
      default:
        return () => null;
    }
  }, [type, Icon]);
  return (
    <button
      type="button"
      css={{
        ...typography('paragraphSmall'),
        height: scale(4),
        width: '100%',
        textAlign: 'left',
        padding: `${scale(1, true)}px ${scale(1)}px`,
        svg: { marginRight: scale(1, true), verticalAlign: 'top' },
        ':hover': { background: colors.backgroundBlue },
      }}
      {...props}
    >
      <IconComponent />
      {children}
    </button>
  );
};
