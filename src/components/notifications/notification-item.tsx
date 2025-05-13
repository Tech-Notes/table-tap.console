import {setNotificationAsRead} from '@/api/notifications';
import {notificationsKeys} from '@/api/query-keys/notifications';
import {ApiError} from '@/base';
import {clientFn} from '@/clientFn';
import {cn} from '@/lib/utils';
import {Notification} from '@/types/notifications';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Dot} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import {toast} from 'sonner';

interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
}) => {
  const queryClient = useQueryClient();
  const {push} = useRouter();
  const {mutate} = useMutation({
    mutationFn: async (id: number) => {
      await clientFn(setNotificationAsRead, id, {})();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: notificationsKeys.list()});
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Failed to create table.');
    },
  });

  const onClick = useCallback(() => {
    //check not to call read action to server if the notification is already read.
    if (!notification.is_read) {
      mutate(notification.id);
    }
    onRead();
    push(`/orders/${notification.meta_data.order_id}`);
  }, [notification]);

  return (
    <li
      onClick={onClick}
      className={cn(
        'cursor-pointer flex items-center gap-4 py-2',
        !notification.is_read && 'bg-card',
      )}>
      <Dot size={42} className={cn(!notification.is_read && 'text-primary')} />
      <div>
        <p className="font-normal text-sm">{notification.message}</p>
        <p className="text-xs">12m</p>
      </div>
    </li>
  );
};

export default NotificationItem;
