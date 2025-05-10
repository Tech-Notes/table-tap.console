'use client';
import {Notification} from '@/types/notifications';
import { Dot } from 'lucide-react';
import React from 'react';
import {twMerge} from 'tailwind-merge';
import {useNotifications} from './notification-context';

const NotificationList = () => {
  const {notifications} = useNotifications();

  return (
    <div className="">
      <ul className="text-sm md:text-base">
        {notifications?.map(notification => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          );
        })}
      </ul>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({notification}) => {
  return (
    <li
      className={twMerge(
        'cursor-pointer flex items-center gap-4 py-2',
        !notification.is_read && 'bg-card',
      )}>
      <Dot
        size={42}
        className={twMerge(!notification.is_read && 'text-primary')}
      />
      <div>
        <p className="font-normal text-sm">{notification.message}</p>
        <p className="text-xs">12m</p>
      </div>
    </li>
  );
};

export default NotificationList;
