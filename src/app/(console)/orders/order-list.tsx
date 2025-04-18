'use client';

import {changeOrderStatus, getOrderList} from '@/api/order';
import {ordersKeys} from '@/api/query-keys/orders';
import {ApiError} from '@/base';
import {clientFn} from '@/clientFn';
import {DataTable} from '@/components/data-table';
import {OrderListResponse, OrderStatus} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';
import {orderListColumns} from './order-list-columns';

const OrderList = () => {
  const {data, isLoading} = useQuery({
    queryKey: ordersKeys.list(),
    queryFn: clientFn<any, OrderListResponse>(getOrderList, {}),
  });

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

  const changeStatus = useCallback((id: number, status: OrderStatus) => {
    mutate({id, status});
  }, []);

  return (
    <div>
      <DataTable
        columns={orderListColumns}
        data={data?.data.orders || []}
        isFetching={isLoading}
        meta={{
          changeStatus,
        }}
        initialState={{
          columnVisibility: {
            table_id: false,
          },
        }}
      />
    </div>
  );
};

export default OrderList;
