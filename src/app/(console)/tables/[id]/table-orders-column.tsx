import OrderStatusComp from '@/components/order-status';
import {SortableColumnHeader} from '@/components/sortable-column-header';
import {Order} from '@/types';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export const tableOrdersColumns: ColumnDef<Order>[] = [
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
          href={`/orders/${row.getValue('id')}`}
          className="hover:underline hover:text-primary">
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
    cell: ({row}) => <OrderStatusComp status={row.getValue('status')} />,
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    header: ({column}) => (
      <div className="flex items-center justify-start">
        <SortableColumnHeader column={column} title="Total" />
      </div>
    ),
    cell: ({row}) => <span>{row.getValue('total')}</span>,
    enableSorting: false,
  },
];
