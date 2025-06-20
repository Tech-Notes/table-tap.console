import {Order} from './orders';

export type TableStatus = 'available' | 'reserved' | 'occupied';
export interface Table {
  id: number;
  business_id: number;
  token: string;
  status: TableStatus;
  qr_code_url: string;
  table_no: number;
  description?: string;
  created_at: Date;
}

export interface TableDetailResponse {
  table: Table;
  orders: Order[];
}

export interface TableFormValues {
  table_no: number;
  description: string;
}
