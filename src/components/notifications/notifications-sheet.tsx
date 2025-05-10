'use client';

import {notificationsKeys} from '@/api/query-keys/notifications';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {cn} from '@/lib/utils';
import {useQueryClient} from '@tanstack/react-query';
import {ConciergeBell} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {toast} from 'sonner';
import {useNotifications} from './notification-context';
import NotificationList from './notification-list';

export function NotificationSheet() {
  const ws = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    const connect = async () => {
      const res = await fetch('/api/notifications/ws');
      const text = await res.text();

      if (text) {
        const {email, signature} = await JSON.parse(text);

        ws.current = new WebSocket(
          `ws://tabletap.local/api/v1/notifications/ws?email=${email}&signature=${signature}`,
        );

        ws.current.onopen = () => {
          console.log('ws connected!');
          ['admin'].forEach(topic => {
            ws.current?.send(JSON.stringify({type: 'subscribe', topic}));
          });
        };

        ws.current.onmessage = event => {
          queryClient.invalidateQueries({queryKey: notificationsKeys.list()});
          const data: {message: string} = JSON.parse(event.data);
          toast.success(data.message);
        };
      }
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
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
