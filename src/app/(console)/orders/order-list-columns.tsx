import {SortableColumnHeader} from '@/components/sortable-column-header';
import {cn} from '@/lib/utils';
import {Order} from '@/types';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export const orderListColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="ID" />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-start">
        <Link href="#" className="hover:underline hover:text-primary">
          {row.getValue('id')}
        </Link>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'table_id',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Table No." />
      </div>
    ),
    cell: ({row}) => (
      <div className={cn('flex items-center justify-start capitalize')}>
        <Link
          href={`/tables/${row.getValue('table_id')}`}
          className="hover:underline hover:text-primary">
          {row.getValue('table_id')}
        </Link>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Status" />
      </div>
    ),
    cell: ({row}) => (
      <div
        className={cn(
          'flex items-center justify-start capitalize',
          row.getValue('status') === 'ready'
            ? 'text-success'
            : row.getValue('status') === 'preparing'
            ? 'text-accent'
            : row.getValue('status') === 'paid'
            ? 'text-primary'
            : 'text-destructive',
        )}>
        <span>{row.getValue('status')}</span>
      </div>
    ),
    enableSorting: false,
  },
];
