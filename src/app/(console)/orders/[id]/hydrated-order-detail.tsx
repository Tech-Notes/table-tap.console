import {getOrderDetail} from '@/api/order';
import {ordersKeys} from '@/api/query-keys/orders';
import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import {OrderDetailResponse} from '@/types';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import OrderDetail from './order-detail';

interface Props {
  id: number;
}

const HydratedOrderDetail: React.FC<Props> = async ({id}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ordersKeys.detail(id),
    queryFn: serverFn<any, OrderDetailResponse>(getOrderDetail, id),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <OrderDetail id={id} />
    </HydrationBoundary>
  );
};

export default HydratedOrderDetail;
