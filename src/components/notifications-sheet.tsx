'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {ConciergeBell, Dot} from 'lucide-react';
import {useEffect, useRef} from 'react';

export function NotificationSheet() {
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const connect = async () => {
      const res = await fetch('/api/notifications');
      const text = await res.text();
      console.log('ws-auth-response-object', text);

      if (text) {
        const {email, signature} = await JSON.parse(text);

        console.log('ws-auth-response: ', email, signature);

        ws.current = new WebSocket(
          `ws://tabletap.local/api/v1/notifications?email=${email}&signature=${signature}`,
        );

        ws.current.onopen = () => {
          console.log('Connected');
          ['admin'].forEach(topic => {
            ws.current?.send(JSON.stringify({type: 'subscribe', topic}));
          });
        };

        ws.current.onmessage = event => {
          const data = event.data;
          console.log('Notification:', data);
          // You can push this to a toast/notification queue here
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
      </SheetContent>
    </Sheet>
  );
}
