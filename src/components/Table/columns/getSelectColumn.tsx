import IndeterminateCheckbox from '../IndeterminateCheckbox';
import { ExtendedColumn } from '../types';

export const getSelectColumn = <D,>(
  maxRowSelect = 0,
  name = '',
): ExtendedColumn<D> => ({
  accessorKey: 'select',

  header: ({ table }) =>
    maxRowSelect ? null : (
      <IndeterminateCheckbox
        id={name}
        parentTableName={name}
        onChange={table.getToggleAllRowsSelectedHandler()}
        indeterminate={table.getIsSomeRowsSelected()}
        checked={table.getIsAllRowsSelected()}
      />
    ),

  cell: ({ row, table }) => {
    const disabled =
      maxRowSelect > 0 &&
      table.getSelectedRowModel().rows.length === maxRowSelect &&
      !row.getIsSelected();

    return (
      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        css={{ display: 'grid', alignItems: 'center' }}
      >
        <IndeterminateCheckbox
          id={row.id}
          parentTableName={name}
          disabled={disabled}
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </button>
    );
  },
  disableSortBy: true,
});
