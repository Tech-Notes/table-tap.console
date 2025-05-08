'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {ConciergeBell} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {toast} from 'sonner';
import NotificationList from './notification-list';

export function NotificationSheet() {
  const ws = useRef<WebSocket | null>(null);
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
          ['admin'].forEach(topic => {
            ws.current?.send(JSON.stringify({type: 'subscribe', topic}));
          });
        };

        ws.current.onmessage = event => {
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
      <SheetTrigger asChild>
        <ConciergeBell size={22} className="cursor-pointer" />
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
