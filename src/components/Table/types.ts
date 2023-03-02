import { ReactNode } from 'react';
import {
  ColumnDef,
  Row,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';

import { ContentBtnProps } from '@components/controls/Tooltip';

export type Data = Record<string, any> & {
  id: string | number;
  string?: string;
};

export type ExtendedColumn<D> = ColumnDef<D> & {
  disableSortBy?: boolean;
};

export type ExtendedRow<D> = Row<D> & {
  isSelected?: boolean;
  toggleRowSelected?: () => void;
  getToggleRowSelectedProps?: any;
  depth?: number;
  canExpand?: boolean;
  toggleRowExpanded?: () => void;
  isExpanded?: boolean;
};

export type TooltipContentProps<D> = {
  text: string;
  type: ContentBtnProps['type'];
  action: (
    originalRow: ExtendedRow<D>['original'] | ExtendedRow<D>['original'][],
  ) => void;
};

export type TableProps<D> = {
  columns: ColumnDef<D>[];
  data: D[];
  /** On double row click */
  onDoubleClick?: (originalRow: D | undefined) => void;
  /** On row right mouse button click */
  onRowContextMenu?: (originalRow: D | undefined) => void;
  /** on row click handler */
  onRowClick?: (originalRow: D | undefined) => void;
  /** Class name */
  className?: string;
  /** Tooltip content array */
  tooltipContent?: TooltipContentProps<D>[];
  /** Has sub rows */
  expandable?: boolean;
  /** Allow row selection */
  allowRowSelect?: boolean;
  /** Disable all columns sorting */
  disableSortBy?: boolean;
  /** On sorting change callback */
  onSortingChange?: (sorting: SortingState) => void;
  /** Render prop for header */
  renderHeader?: (selectedRows: D[], resetSelection: () => void) => ReactNode;
  /** Column id for initial sorting */
  initialSortBy?: string;
  /** Default visible columns. Array of column id's */
  defaultVisibleColumns?: string[];
  /** Allow column order */
  allowColumnOrder?: boolean;
  options?: Partial<TableOptions<D>>;
  children?: ReactNode | ReactNode[];
};

export type TableRowProps<D> = {
  row: ExtendedRow<D>;
  tooltipContent: TooltipContentProps<D>[];
} & Pick<TableProps<D>, 'onRowClick' | 'onDoubleClick' | 'onRowContextMenu'>;
