'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {cn} from '@/lib/utils';
import {ConciergeBell} from 'lucide-react';
import {NotificationProvider, useNotifications} from './notification-context';
import NotificationList from './notification-list';

export function NotificationSheet() {
  return (
    <NotificationProvider>
      <Sheet>
        <SheetTrigger>
          <Trigger />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <NotificationList />
        </SheetContent>
      </Sheet>
    </NotificationProvider>
  );
}

const Trigger = () => {
  const {unreadCount} = useNotifications();
  return (
    <div className="relative">
      <p
        className={cn(
          'absolute bottom-3 left-4 text-xs',
          unreadCount && 'text-red-500',
        )}>
        {unreadCount}
      </p>
      <ConciergeBell
        size={22}
        className={cn('cursor-pointer', unreadCount && 'text-red-500')}
      />
    </div>
  );
};
