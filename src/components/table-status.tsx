import { cn } from '@/lib/utils';
import { TableStatus } from '@/types';
import React from 'react';

interface Props {
  status: TableStatus;
}
const TableStatusComp: React.FC<Props> = ({status}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-start capitalize',
        status === 'available'
          ? 'text-success'
          : status === 'reserved'
          ? 'text-accent'
          : 'text-destructive',
      )}>
      <span>{status}</span>
    </div>
  );
};

export default TableStatusComp;