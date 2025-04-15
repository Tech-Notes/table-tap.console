'use client';

import {tableKeys} from '@/api/query-keys/tables';
import {getTableList} from '@/api/tables';
import {clientFn} from '@/clientFn';
import {DataTable} from '@/components/data-table';
import {Table} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {tableListColumns} from './table-list-columns';

const TableList = () => {
  const {data, isLoading} = useQuery({
    queryKey: tableKeys.list(),
    queryFn: clientFn<any, {tables: Table[]}>(getTableList, {}),
  });

  return (
    <div>
      <DataTable
        columns={tableListColumns}
        data={data?.data.tables || []}
        isFetching={isLoading}
      />
    </div>
  );
};

export default TableList;
