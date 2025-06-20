import {cn} from '@/lib/utils';
import * as React from 'react';

interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageShell({children, className, ...props}: PageShellProps) {
  return (
    <div
      className={cn(
        'border-none bg-transparent shadow-none px-4 md:px-8 py-4 mt-2',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}
