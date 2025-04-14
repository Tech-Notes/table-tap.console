'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PropsWithChildren} from 'react';
import {Toaster} from 'sonner';
import {useTheme} from 'next-themes';

const queryClient = new QueryClient();

const Providers = ({children}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastWithTheme />
    </QueryClientProvider>
  );
};

export type ThemeType = 'light' | 'dark' | 'system';

const ToastWithTheme = () => {
  const {theme} = useTheme();

  return (
    <Toaster richColors theme={theme as ThemeType} className="toaster group" />
  );
};

export default Providers;
