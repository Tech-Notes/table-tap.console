import {getOrderList} from '@/api/order';
import {ordersKeys} from '@/api/query-keys/orders';
import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import {OrderListResponse} from '@/types';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import OrderList from './order-list';

const HydratedOrderList = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ordersKeys.list(),
    queryFn: serverFn<any, OrderListResponse>(getOrderList, {}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <OrderList />
    </HydrationBoundary>
  );
};
export default HydratedOrderList;
