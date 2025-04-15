import { cn } from '@/lib/utils';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

interface LinkTagProps extends PropsWithChildren {
  href?: string;
  className?: string;
  type?: 'default' | 'muted';
  target?: HTMLAttributeAnchorTarget;
}

const LinkTag: React.FC<LinkTagProps> = ({
  children,
  className,
  href,
  type = 'default',
  target = '_self',
}) => {
  return (
    <div
      className={cn(
        'text-primary hover:text-primary-foreground hover:underline cursor-pointer',
        (!children || type === 'muted') &&
          'text-muted-foreground hover:text-muted-foreground',
        className,
      )}>
      {!!href ? (
        <Link href={href} target={target}>
          {children ? children : '-'}
        </Link>
      ) : (
        <p>{children ? children : '-'}</p>
      )}
    </div>
  );
};

export default LinkTag;
