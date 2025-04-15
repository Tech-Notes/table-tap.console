'use client';

import {tableKeys} from '@/api/query-keys/tables';
import {getTableList} from '@/api/tables';
import {clientFn} from '@/clientFn';
import {Table} from '@/types';
import {useQuery} from '@tanstack/react-query';

const TableList = () => {
  const {data} = useQuery({
    queryKey: tableKeys.list(),
    queryFn: clientFn<any, Table[]>(getTableList, {}),
  });

  console.log('Table list data: ', data);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Tables</h1>
      <p className="mt-4 text-lg">Welcome to the tables page!</p>
    </div>
  );
};

export default TableList;
