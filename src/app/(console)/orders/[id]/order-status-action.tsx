import { changeOrderStatus } from '@/api/order';
import { ordersKeys } from '@/api/query-keys/orders';
import { ApiError } from '@/base';
import { clientFn } from '@/clientFn';
import OrderStatusComp from '@/components/order-status';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

export const statusActionsMap: Record<
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

export const useOrderStatusAction = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: async (data: {id: number; status: OrderStatus}) => {
      return await clientFn(changeOrderStatus, data.id, {
        status: data.status,
      })();
    },
    onSuccess: data => {
      toast.success('Order status updated.');
      queryClient.invalidateQueries({queryKey: ordersKeys.list()});
      queryClient.invalidateQueries({
        queryKey: ordersKeys.detail(data.data?.id),
      });
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Failed to change order status.');
    },
  });

  return {mutate};
};

interface Props {
  id: number;
  status: OrderStatus;
  changeOrderStatus: (id: number, status: OrderStatus) => void;
}

const OrderStatusAction: React.FC<Props> = ({
  id,
  status,
  changeOrderStatus,
}) => {
  const statusMap = statusActionsMap[status];
  const onStatusChange = useCallback((updatedStatus: OrderStatus) => {
    changeOrderStatus(id, updatedStatus);
  }, []);
  return (
    <DropdownMenu key={1}>
      <DropdownMenuTrigger asChild>
        <Button>Change Order Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusMap?.map((o, i) => (
          <DropdownMenuItem
            key={o.status}
            className={cn(i !== statusMap.length - 1 && 'border-b')}
            onClick={() => onStatusChange(o.status)}>
            <OrderStatusComp status={o.status} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatusAction;
