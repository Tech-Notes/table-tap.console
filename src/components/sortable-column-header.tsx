import {cn} from '@/lib/utils';
import {Column} from '@tanstack/react-table';
import {ArrowDown, ArrowUp, ChevronsUpDown} from 'lucide-react';
import {useCallback} from 'react';
import {Button} from './ui/button';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function SortableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const onSort = useCallback(() => {
    column.toggleSorting(!(column.getIsSorted() === 'desc'));
  }, [column]);

  if (!column.getCanSort()) {
    return <div className={cn('text-xs', className)}>{title}</div>;
  }

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-0 hover:bg-transparent text-start text-xs"
            onClick={onSort}>
            <span className="w-full uppercase">{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
