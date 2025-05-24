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
        {!!notifications.length ? (
          notifications?.map(notification => {
            return (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={closeSheet}
              />
            );
          })
        ) : (
          <li className="text-center text-muted-foreground">
            No notifications
          </li>
        )}
      </ul>
    </div>
  );
};

export default NotificationList;
