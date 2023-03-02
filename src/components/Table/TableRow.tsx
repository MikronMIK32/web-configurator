import { useEffect } from 'react';
import { followCursor } from 'tippy.js';

import Tooltip, { ContentBtn } from '@components/controls/Tooltip';

import { scale } from '@scripts/helpers';
import { flexRender } from '@tanstack/react-table';
import { TableRowProps } from './types';
import { StyledCell, StyledRow } from './utils';
import { useRow } from './RowContext';

export const TableRow = <D,>({
  row,
  onRowClick,
  tooltipContent,
  onDoubleClick,
  onRowContextMenu,
}: TableRowProps<D>) => {
  const { visible, setVisible } = useRow();

  const getTooltipContent = () => (
    <ul>
      {tooltipContent.map((t) => (
        <li key={t.text}>
          <ContentBtn
            type={t.type}
            onClick={(e) => {
              e.stopPropagation();
              t.action(row.original);
              setVisible(false);
            }}
          >
            {t.text}
          </ContentBtn>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    if (visible) {
      document.addEventListener('keydown', callback);
    }
    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [setVisible, visible]);

  return (
    <Tooltip
      content={getTooltipContent()}
      plugins={[followCursor]}
      followCursor="initial"
      arrow
      theme="light"
      placement="bottom"
      minWidth={scale(36)}
      disabled={tooltipContent.length === 0}
      appendTo={() => document.body}
      visible={visible}
      onClickOutside={() => setVisible(false)}
    >
      <StyledRow
        key={row.id}
        onClick={() => {
          if (onRowClick) onRowClick(row.original);
        }}
        onDoubleClick={() => {
          if (onDoubleClick) onDoubleClick(row.original);
        }}
        {...(onRowContextMenu && {
          onContextMenu: (e) => {
            e.preventDefault();
            setVisible((old) => !old);
            onRowContextMenu(row.original);
          },
        })}
      >
        {row.getVisibleCells().map((cell) => (
          <StyledCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </StyledCell>
        ))}
      </StyledRow>
    </Tooltip>
  );
};
