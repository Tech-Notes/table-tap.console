import {fetchJSON} from '@/base';
import {
  OrderDetailResponse,
  OrderListResponse,
  OrderStatus,
} from '@/types/orders';
import {GenerateHMACSignatureHeaderFn} from '@/types/types';

export const getOrderList = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  params: any,
) => {
  return fetchJSON<OrderListResponse, any>(
    `${baseUrl}/orders`,
    headerFn,
    params,
    'GET',
  );
};

export const getOrderDetail = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  id: number,
  params: any,
) => {
  return fetchJSON<OrderDetailResponse, any>(
    `${baseUrl}/orders/${id}`,
    headerFn,
    params,
    'GET',
  );
};

export const changeOrderStatus = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  id: number,
  params: any,
) => {
  return fetchJSON<any, any>(
    `${baseUrl}/orders/${id}/status`,
    headerFn,
    params,
    'PATCH',
  );
};
