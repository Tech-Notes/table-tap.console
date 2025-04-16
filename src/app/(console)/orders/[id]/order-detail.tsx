'use client';
import {getOrderDetail} from '@/api/order';
import {ordersKeys} from '@/api/query-keys/orders';
import {clientFn} from '@/clientFn';
import Box from '@/components/box';
import {
  DescriptionList,
  DescriptionListItem,
} from '@/components/description-list';
import OrderStatusComp from '@/components/order-status';
import {OrderDetailResponse} from '@/types';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';

interface Props {
  id: number;
}
const OrderDetail: React.FC<Props> = ({id}) => {
  const {data} = useQuery({
    queryKey: ordersKeys.detail(id),
    queryFn: clientFn<any, OrderDetailResponse>(getOrderDetail, id),
  });

  const order = data?.data.order;
  return (
    <div>
      <Box>
        <DescriptionList>
          <DescriptionListItem title="Order ID">
            <span>{order?.id}</span>
          </DescriptionListItem>
          <DescriptionListItem title="Status">
            <OrderStatusComp
              status={order?.status || 'pending'}
              className="text-base"
            />
          </DescriptionListItem>
          <DescriptionListItem title="Table No.">
            <Link
              href={`/tables/${order?.table_id}`}
              className="hover:text-primary hover:underline">
              {order?.table_id}
            </Link>
          </DescriptionListItem>
        </DescriptionList>
      </Box>
    </div>
  );
};

export default OrderDetail;
