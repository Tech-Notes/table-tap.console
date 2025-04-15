import { cn } from '@/lib/utils';
import {
  ColumnDef,
  ColumnMeta,
  InitialTableState,
  SortingState,
  TableMeta,
  Updater,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash-es';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting?: SortingState;
  onSetSorting?: (newSorting: SortingState) => void;
  meta?: TableMeta<TData>;
  rowSelection?: {};
  onRowSelectionChange?: (newSelection: {}) => void;
  initialState?: InitialTableState;
  tableFooter?: React.ReactNode;
  isFetching?: boolean;
  isSticky?: boolean;
  showHeader?: boolean;
  tableClass?: string;
  containerStyles?: string;
}

interface DataTableColumnMeta<TData, TValue> extends ColumnMeta<TData, TValue> {
  headerClass?: string;
  cellClass?: string;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    sorting = [],
    onSetSorting,
    meta,
    rowSelection = {},
    onRowSelectionChange,
    initialState,
    tableFooter,
    isFetching = false,
    isSticky = true,
    showHeader = true,
    tableClass,
    containerStyles,
  } = props;

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      let newSort: SortingState;
      if (typeof updaterOrValue === 'function') {
        newSort = updaterOrValue(sorting);
      } else {
        newSort = updaterOrValue;
      }
      !!onSetSorting && onSetSorting(newSort);
    },
    [onSetSorting, sorting],
  );

  const onRowSelectionChangeX = React.useCallback(
    (updaterOrValue: Updater<{}>) => {
      let newSelection: {};
      if (typeof updaterOrValue === 'function') {
        newSelection = updaterOrValue(rowSelection);
      } else {
        newSelection = updaterOrValue;
      }
      !!onRowSelectionChange && onRowSelectionChange(newSelection);
    },
    [onRowSelectionChange, rowSelection],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    meta,
    enableRowSelection: true,
    manualSorting: true,
    onSortingChange,
    onRowSelectionChange: onRowSelectionChangeX,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: row => (row as any).subRows || [],
    initialState,
  });

  return (
    <div className={cn('overflow-hidden border rounded-md', containerStyles)}>
      <Table className={cn('bg-primary-foreground', tableClass)}>
        {showHeader && (
          <TableHeader
            className={cn(
              'bg-card uppercase',
              isSticky ? 'sticky top-0' : '',
            )}>
            {table?.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'h-10',
                        (
                          header.column.columnDef.meta as DataTableColumnMeta<
                            TData,
                            TValue
                          >
                        )?.headerClass,
                      )}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        )}

        <TableBody>
          {isFetching ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24">
                <div className="text-muted-foreground flex items-center justify-center space-x-2">
                  <span>Loading...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows?.map(row => (
              <React.Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={
                        (
                          cell.column.columnDef.meta as DataTableColumnMeta<
                            TData,
                            TValue
                          >
                        )?.cellClass
                      }>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {!isEmpty(row.subRows) ? (
                  <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                      <Table style={{tableLayout: 'fixed'}}>
                        <TableBody>
                          {row.subRows.map(subRow => {
                            return (
                              <TableRow
                                key={subRow.id}
                                data-state={
                                  subRow.getIsSelected() && 'selected'
                                }>
                                {subRow.getVisibleCells().map(cell => (
                                  <TableCell
                                    key={cell.id}
                                    // colSpan={1}
                                    className={
                                      (
                                        cell.column.columnDef
                                          .meta as DataTableColumnMeta<
                                          TData,
                                          TValue
                                        >
                                      )?.cellClass
                                    }>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {tableFooter}
      </Table>
    </div>
  );
}
