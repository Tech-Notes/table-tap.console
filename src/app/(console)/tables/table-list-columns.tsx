import { SortableColumnHeader } from '@/components/sortable-column-header';
import {cn} from '@/lib/utils';
import { Table } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const tableListColumns: ColumnDef<Table>[] = [
  {
    accessorKey: 'id',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Table No." />
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
          row.getValue('status') === 'available'
            ? 'text-success'
            : row.getValue('status') === 'reserved'
            ? 'text-accent'
            : 'text-destructive',
        )}>
        <span>{row.getValue('status')}</span>
      </div>
    ),
    enableSorting: false,
  },
  // {
  //   accessorKey: 'token',
  //   header: ({column}) => (
  //     <div className="flex items-center justify-start">
  //       <SortableColumnHeader column={column} title="Token" />
  //     </div>
  //   ),
  //   cell: ({row}) => (
  //     <div className="flex items-center justify-start">
  //       <span>{row.getValue('token')}</span>
  //     </div>
  //   ),
  //   enableSorting: false,
  // },
];
