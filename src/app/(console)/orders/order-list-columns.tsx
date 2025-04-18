import OrderStatusComp from '@/components/order-status';
import {SortableColumnHeader} from '@/components/sortable-column-header';
import TableRowActions from '@/components/table-row-actions';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import {cn} from '@/lib/utils';
import {Order, OrderStatus} from '@/types';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

const statusActionsMap: Record<
  OrderStatus,
  {status: OrderStatus; label: string}[]
> = {
  pending: [
    {status: 'preparing', label: 'Preparing'},
    {status: 'ready', label: 'Ready'},
    {status: 'paid', label: 'Pending'},
  ],
  preparing: [
    {status: 'ready', label: 'Ready'},
    {status: 'paid', label: 'Paid'},
  ],
  ready: [{status: 'paid', label: 'Paid'}],
  paid: [],
};

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
    accessorKey: 'table_no',
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
          {row.getValue('table_no')}
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
    accessorKey: 'actions',
    header: ({column}) => <div></div>,
    cell: ({row, table}) => {
      const statusMap = statusActionsMap[row.getValue('status') as OrderStatus];
      return (
        row.getValue('status') !== 'paid' && (
          <TableRowActions
            row={row}
            renderMenuItems={r => {
              return (
                <>
                  {!!statusMap?.length && (
                    <DropdownMenuSub key={1}>
                      <DropdownMenuSubTrigger className="hover:bg-primary">
                        Change Order Status
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {statusMap?.map((o, i) => (
                            <DropdownMenuItem
                              key={o.status}
                              className={cn(
                                i !== statusMap.length - 1 && 'border-b',
                              )}
                              onClick={() =>
                                (table.options.meta as any).changeStatus(
                                  r.getValue('id'),
                                  o.status,
                                )
                              }>
                              {o.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  )}
                </>
              );
            }}
          />
        )
      );
    },
  },
  {accessorKey: 'table_id'},
];
