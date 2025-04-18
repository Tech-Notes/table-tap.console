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
import {OrderDetailResponse, OrderStatus} from '@/types';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {useCallback} from 'react';
import OrderStatusAction, {useOrderStatusAction} from './order-status-action';

interface Props {
  id: number;
}
const OrderDetail: React.FC<Props> = ({id}) => {
  const {data} = useQuery({
    queryKey: ordersKeys.detail(id),
    queryFn: clientFn<any, OrderDetailResponse>(getOrderDetail, id),
  });

  const {mutate} = useOrderStatusAction();

  const changeStatus = useCallback((id: number, status: OrderStatus) => {
    mutate({id, status});
  }, []);

  const order = data?.data?.order;
  if (!order) {
    return <span>NO DATA</span>;
  }
  return (
    <div>
      {order.status !== 'paid' && (
        <div className="flex justify-end items-center py-4">
          <OrderStatusAction
            id={id}
            status={order?.status}
            changeOrderStatus={changeStatus}
          />
        </div>
      )}
      <Box>
        <DescriptionList>
          <DescriptionListItem title="Order ID">
            <span>{order?.id}</span>
          </DescriptionListItem>
          <DescriptionListItem title="Table No.">
            <Link
              href={`/tables/${order?.table_id}`}
              className="hover:text-primary hover:underline">
              {order?.table_no}
            </Link>
          </DescriptionListItem>
          <DescriptionListItem title="Status">
            <OrderStatusComp
              status={order?.status || 'pending'}
              className="text-base"
            />
          </DescriptionListItem>
        </DescriptionList>
      </Box>
    </div>
  );
};

export default OrderDetail;
