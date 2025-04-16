'use client';

import { getOrderList } from '@/api/order';
import { ordersKeys } from '@/api/query-keys/orders';
import { clientFn } from '@/clientFn';
import { DataTable } from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import { orderListColumns } from './order-list-columns';
import { OrderListResponse } from '@/types';

const OrderList = () => {
  const {data, isLoading} = useQuery({
    queryKey: ordersKeys.list(),
    queryFn: clientFn<any, OrderListResponse>(getOrderList, {}),
  });

  return (
    <div>
      <DataTable
        columns={orderListColumns}
        data={data?.data.orders || []}
        isFetching={isLoading}
      />
    </div>
  );
};

export default OrderList;
