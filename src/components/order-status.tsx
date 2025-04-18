import {cn} from '@/lib/utils';
import {OrderStatus} from '@/types';

interface Props {
  status: OrderStatus;
  className?: string;
}

const OrderStatusComp: React.FC<Props> = ({status, className}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-start capitalize',
        status === 'ready'
          ? 'text-success'
          : status === 'preparing'
          ? 'text-secondary-accent'
          : status === 'paid'
          ? 'text-primary'
          : 'text-destructive',
        className,
      )}>
      <span>{status}</span>
    </div>
  );
};

export default OrderStatusComp;
