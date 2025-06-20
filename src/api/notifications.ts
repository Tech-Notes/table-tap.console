import {fetchJSON} from '@/base';
import {NotificationListResponse} from '@/types/notifications';
import {GenerateHMACSignatureHeaderFn} from '@/types/types';

export const getNotificationList = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  params: any,
) => {
  return fetchJSON<NotificationListResponse, any>(
    `${baseUrl}/notifications`,
    headerFn,
    params,
    'GET',
  );
};

export const setNotificationAsRead = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  id: number,
  params: any,
) => {
  return fetchJSON<NotificationListResponse, any>(
    `${baseUrl}/notifications/${id}`,
    headerFn,
    params,
    'PATCH',
  );
};
