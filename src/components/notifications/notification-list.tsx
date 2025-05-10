'use client';
import {useNotifications} from './notification-context';
import NotificationItem from './notification-item';

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

export default NotificationList;
