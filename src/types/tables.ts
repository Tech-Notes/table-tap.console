type tableStatus = 'available' | 'reserved' | 'occupied';
export interface Table {
  id: number;
  business_id: number;
  token: string;
  status: tableStatus;
  qr_code_url: string;
}

export interface TableDetailResponse {
  table: Table;
}