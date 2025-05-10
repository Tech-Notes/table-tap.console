import {getNotificationList} from '@/api/notifications';
import {notificationsKeys} from '@/api/query-keys/notifications';
import {clientFn} from '@/clientFn';
import {Notification} from '@/types/notifications';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

interface NotificationContext {
  notifications: Notification[];
  unreadCount: number;
}

export const useNotifications = (): NotificationContext => {
  const {data, isError} = useQuery({
    queryKey: notificationsKeys.list(),
    queryFn: clientFn(getNotificationList, {}),
  });

  const unreadCount = useMemo(() => {
    return data?.data.notifications.filter(noti => !noti.is_read).length || 0;
  }, [data]);

  if (isError || !data) {
    return {
      notifications: [],
      unreadCount: 0,
    };
  }

  return {notifications: data.data.notifications, unreadCount};
};
