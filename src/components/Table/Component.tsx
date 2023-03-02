import {
  ColumnOrderState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { RowProvider } from './RowContext';
import { TableRow } from './TableRow';
import { TableProps } from './types';
import { SortingIcon, StyledHeadCell } from './utils';

const isDescSort = (columnId: string) => /^-/.test(columnId);

const Table = <D,>({
  columns,
  data,
  className,
  children,
  onRowClick,
  onRowContextMenu,
  onDoubleClick,
  tooltipContent = [],
  allowRowSelect = true,
  expandable = false,
  disableSortBy = false,
  allowColumnOrder = true,
  onSortingChange,
  renderHeader,
  initialSortBy,
  options,
}: TableProps<D>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      ...(allowColumnOrder && {
        columnOrder,
      }),
      expanded,
    },
    enableRowSelection: allowRowSelect,
    enableSorting: !disableSortBy,
    enableExpanding: expandable,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    ...(allowColumnOrder && {
      onColumnOrderChange: setColumnOrder,
    }),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
    ...options,
  });

  const selectedRows = useMemo(() => {
    if (rowSelection) {
      const ids = Object.keys(rowSelection);
      const selectedRowsArray: D[] = [];
      ids.forEach((i) => {
        selectedRowsArray.push(data[+i]);
      });
      return selectedRowsArray;
    }
    return [];
  }, [data, rowSelection]);

  // Set sorting arrow in column header if needed
  useEffect(() => {
    if (initialSortBy)
      setSorting([
        { id: initialSortBy.replace('-', ''), desc: isDescSort(initialSortBy) },
      ]);
  }, [initialSortBy, setSorting]);

  // on sorting change callback calling
  useEffect(() => {
    if (onSortingChange) onSortingChange(sorting);
  }, [sorting, onSortingChange]);

  return (
    <>
      {renderHeader &&
        renderHeader(selectedRows, () => {
          if (selectedRows?.length)
            tableInstance.getToggleAllRowsSelectedHandler()(false);
        })}
      <div css={{ display: 'grid', gridTemplateColumns: '1fr' }}>
        <div css={{ width: '100%', overflow: 'auto' }} className={className}>
          <table
            css={{
              position: 'relative',
              width: '100%',
              borderSpacing: 0,
              borderCollapse: 'collapse',
              tableLayout: 'auto',
            }}
          >
            {children}

            <thead>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <StyledHeadCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getIsSorted() && (
                            <SortingIcon
                              isSortedDesc={
                                header.column.getIsSorted() === 'desc'
                              }
                            />
                          )}
                        </>
                      )}
                    </StyledHeadCell>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {tableInstance.getRowModel().rows.map((row) => (
                <RowProvider key={row.id}>
                  <TableRow
                    tooltipContent={tooltipContent}
                    onRowClick={onRowClick}
                    onRowContextMenu={onRowContextMenu}
                    onDoubleClick={onDoubleClick}
                    row={row}
                  />
                </RowProvider>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
