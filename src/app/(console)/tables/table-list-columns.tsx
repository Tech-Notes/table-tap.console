import {SortableColumnHeader} from '@/components/sortable-column-header';
import TableStatusComp from '@/components/table-status';
import {Table} from '@/types';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export const tableListColumns: ColumnDef<Table>[] = [
  {
    accessorKey: 'id',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="ID" />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-start">
        <Link
          href={`/tables/${row.getValue('id')}`}
          className="hover:underline hover:text-primary">
          {row.getValue('id')}
        </Link>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'table_no',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Table NO." />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-start">
        <span>{row.getValue('table_no')}</span>
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
    cell: ({row}) => <TableStatusComp status={row.getValue('status')} />,
    enableSorting: false,
  },
];
