export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'paid';

export interface Order {
  id: number;
  business_id: number;
  table_id: number;
  table_no: number;
  status: OrderStatus;
}

export interface OrderListResponse {
  orders: Order[];
}

export interface OrderDetailResponse {
  order: Order;
}
