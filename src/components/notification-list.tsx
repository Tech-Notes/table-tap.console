'use client';
import { getNotificationList } from '@/api/notifications';
import { notificationsKeys } from '@/api/query-keys/notifications';
import { clientFn } from '@/clientFn';
import { useQuery } from '@tanstack/react-query';
import { Dot } from 'lucide-react';

const NotificationList = () => {
  const {data} = useQuery({
    queryKey: notificationsKeys.list(),
    queryFn: clientFn(getNotificationList, {}),
  });

  console.log("notification list: ", data)
  return (
    <div className="p-4">
      <ul className="text-sm md:text-base">
        <li className="cursor-pointer flex items-center space-x-2 border-b-2 py-2">
          <Dot size={40} className="text-red-500" />
          New order #123
        </li>
        <li className="cursor-pointer text-muted-foreground flex items-center space-x-2 border-b-2 py-2">
          <Dot size={40} />
          <p>
            Table 9&rsquo;s order status is changed to
            <span className="text-green-500 pl-2">Ready</span>.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default NotificationList;
