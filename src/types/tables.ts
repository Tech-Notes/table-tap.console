export type TableStatus = 'available' | 'reserved' | 'occupied';
export interface Table {
  id: number;
  business_id: number;
  token: string;
  status: TableStatus;
  qr_code_url: string;
  table_no: number;
}

export interface TableDetailResponse {
  table: Table;
}
