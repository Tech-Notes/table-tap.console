'use client';

import {tableKeys} from '@/api/query-keys/tables';
import {getTableList} from '@/api/tables';
import {clientFn} from '@/clientFn';
import {DataTable} from '@/components/data-table';
import {Button} from '@/components/ui/button';
import {Table} from '@/types';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {tableListColumns} from './table-list-columns';

const TableList = () => {
  const {data, isLoading} = useQuery({
    queryKey: tableKeys.list(),
    queryFn: clientFn<any, {tables: Table[]}>(getTableList, {}),
  });

  return (
    <div>
      <div className="flex justify-end items-center py-4">
        <Button className="cursor-pointer" asChild>
          <Link href="/tables/create">Add New</Link>
        </Button>
      </div>
      <DataTable
        columns={tableListColumns}
        data={data?.data?.tables || []}
        isFetching={isLoading}
      />
    </div>
  );
};

export default TableList;
