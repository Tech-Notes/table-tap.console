import {cn} from '@/lib/utils';
import {FC} from 'react';
import LinkTag from './link-tag';

interface PageTitleProps {
  title: string;
  goto?: string;
  href?: string;
  className?: string;
  prefix?: string;
  prefixLink?: string;
  postfix?: string | number;
}

const PageTitle: FC<PageTitleProps> = ({
  title,
  goto,
  href,
  className,
  prefix,
  prefixLink,
  postfix,
}) => {
  return (
    <h1 className={cn('flex gap-1 mb-4', className)}>
      {prefixLink && prefix && (
        <>
          <LinkTag href={prefixLink} type="muted">
            {prefix}
          </LinkTag>
          <span>/</span>
        </>
      )}
      {goto && href && (
        <>
          <LinkTag href={href} type="muted">
            {goto}
          </LinkTag>
          <span>/</span>
        </>
      )}
      <span className="font-semibold">{title}</span>
      {postfix && (
        <span className="text-muted-foreground ml-2">#{postfix}</span>
      )}
    </h1>
  );
};

export default PageTitle;
