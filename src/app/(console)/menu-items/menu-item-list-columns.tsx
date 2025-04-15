import {SortableColumnHeader} from '@/components/sortable-column-header';
import {cn} from '@/lib/utils';
import {MenuItem} from '@/types';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export const menuItemListColumns: ColumnDef<MenuItem>[] = [
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
    accessorKey: 'name',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Name" />
      </div>
    ),
    cell: ({row}) => (
      <div className={cn('flex items-center justify-start capitalize')}>
        <span>{row.getValue('name')}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'category',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Category" />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-start">
        <span>{row.getValue('category') || '-'}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Price" />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-start">
        <span>{row.getValue('price')}</span>
      </div>
    ),
    enableSorting: false,
  },
];
