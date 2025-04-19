'use client';

import {getOrderList} from '@/api/order';
import {ordersKeys} from '@/api/query-keys/orders';
import {clientFn} from '@/clientFn';
import {DataTable} from '@/components/data-table';
import {OrderListResponse, OrderStatus} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useOrderStatusAction} from './[id]/order-status-action';
import {orderListColumns} from './order-list-columns';

const OrderList = () => {
  const {data, isLoading} = useQuery({
    queryKey: ordersKeys.list(),
    queryFn: clientFn<any, OrderListResponse>(getOrderList, {}),
  });

  const {mutate} = useOrderStatusAction();

  const changeStatus = useCallback((id: number, status: OrderStatus) => {
    mutate({id, status});
  }, []);

  return (
    <div>
      <DataTable
        columns={orderListColumns}
        data={data?.data?.orders || []}
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
