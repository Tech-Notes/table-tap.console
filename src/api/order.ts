import { fetchJSON } from '@/base';
import { OrderListResponse } from '@/types/orders';
import { GenerateHMACSignatureHeaderFn } from '@/types/types';

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
