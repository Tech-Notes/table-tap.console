'use client';
import React from 'react';
import {useNotifications} from './notification-context';
import NotificationItem from './notification-item';

interface Props {
  closeSheet: () => void;
}

const NotificationList: React.FC<Props> = ({closeSheet}) => {
  const {notifications} = useNotifications();

  return (
    <div className="">
      <ul className="text-sm md:text-base">
        {notifications?.map(notification => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={closeSheet}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationList;
