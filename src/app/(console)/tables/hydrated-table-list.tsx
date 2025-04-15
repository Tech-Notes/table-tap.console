import { tableKeys } from '@/api/query-keys/tables';
import { getTableList } from '@/api/tables';
import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import { Table } from '@/types';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import TableList from './table-list';

const HydratedTableList = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: tableKeys.list(),
    queryFn: serverFn<any, Table[]>(getTableList, {}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <TableList />
    </HydrationBoundary>
  );
};
export default HydratedTableList;
