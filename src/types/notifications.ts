export type NotificationType = 'new_order' | 'update_order_status';

export interface NotificationMetaData {
  table_id: number;
  order_id?: number;
}

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  is_read: boolean;
  meta_data: NotificationMetaData;
  business_id: number;
}

export interface NotificationListResponse {
  notifications: Notification[];
}
