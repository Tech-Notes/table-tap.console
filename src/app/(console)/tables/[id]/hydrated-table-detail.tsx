import { tableKeys } from '@/api/query-keys/tables';
import { getTableDetail } from '@/api/tables';
import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import { TableDetailResponse } from '@/types';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import TableDetail from './table-detail';

interface Props {
  id: number;
}

const HydratedTableDetail: React.FC<Props> = async ({id}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: tableKeys.detail(id),
    queryFn: serverFn<any, TableDetailResponse>(getTableDetail, id),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <TableDetail id={id}/>
    </HydrationBoundary>
  );
};

export default HydratedTableDetail;
