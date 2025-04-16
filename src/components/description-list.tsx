import {cn} from '@/lib/utils';
import React, {ReactNode} from 'react';

interface Props {
  title?: string | ReactNode;
  className?: string;
}

export const DescriptionList = ({
  children,
  title,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <dl className={className}>
      <div className="mb-4 text-sm font-medium">{title}</div>
      {children}
    </dl>
  );
};

interface DescriptionListItemProps {
  title: string | ReactNode;
  mode?: 'default' | 'bold';
  className?: string;
  muteTitle?: boolean;
}

export const DescriptionListItem = ({
  title,
  children,
  className,
  mode = 'default',
  muteTitle = true,
  ...props
}: React.PropsWithChildren<DescriptionListItemProps>) => {
  return (
    <div
      className={cn('grid grid-cols-3 py-3 text-sm items-center', className)}
      {...props}>
      <div>
        <dt className={cn('col-span-1', muteTitle && 'text-muted-foreground')}>
          {title}
        </dt>
      </div>
      <div
        className={cn(
          'col-span-2',
          mode === 'bold' && 'font-semibold',
          !children && 'text-muted-foreground  font-normal',
        )}>
        {children ? (
          children
        ) : (
          <span className="italic">{'This field is empty.'}</span>
        )}
      </div>
    </div>
  );
};
