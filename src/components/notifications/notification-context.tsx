import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {toast} from 'sonner';

type NotificationContextType = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [unreadCount, setUnreadCount] = useState(10);

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
    <NotificationContext.Provider value={{unreadCount, setUnreadCount}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      'useNotifications must be used inside NotificationProvider',
    );
  return ctx;
};
