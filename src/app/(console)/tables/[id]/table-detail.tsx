'use client';
import {tableKeys} from '@/api/query-keys/tables';
import {getTableDetail, markTableOrdersAsPaid} from '@/api/tables';
import {ApiError} from '@/base';
import {clientFn} from '@/clientFn';
import Box from '@/components/box';
import {DataTable} from '@/components/data-table';
import {
  DescriptionList,
  DescriptionListItem,
} from '@/components/description-list';
import PageTitle from '@/components/page-title';
import TableStatusComp from '@/components/table-status';
import {Button} from '@/components/ui/button';
import {TableCell, TableRow} from '@/components/ui/table';
import {TableDetailResponse} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {sum} from 'lodash-es';
import {useCallback} from 'react';
import {toast} from 'sonner';
import {tableOrdersColumns} from './table-orders-column';

interface Props {
  id: number;
}
const TableDetail: React.FC<Props> = ({id}) => {
  const {data, isLoading} = useQuery({
    queryKey: tableKeys.detail(id),
    queryFn: clientFn<any, TableDetailResponse>(getTableDetail, id),
  });

  const table = data?.data?.table;
  const orders = data?.data?.orders;

  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: async (table_id: number) => {
      return await clientFn(markTableOrdersAsPaid, table_id, {})();
    },
    onSuccess: data => {
      toast.success('Action success.');
      queryClient.invalidateQueries({
        queryKey: tableKeys.detail(data?.data?.id),
      });
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Action failed.');
    },
  });

  const markAsPaid = useCallback(() => {
    mutate(id);
  }, [id]);

  return (
    <div>
      <Box>
        <DescriptionList>
          <DescriptionListItem title="Table No.">
            <span>{table?.table_no}</span>
          </DescriptionListItem>
          <DescriptionListItem title="Status">
            <TableStatusComp status={table?.status || 'available'} />
          </DescriptionListItem>
          <DescriptionListItem className="items-start" title="Qr">
            <img
              alt="Table Qr"
              src={`${table?.qr_code_url}` || ''}
              width={200}
              height={200}
            />
          </DescriptionListItem>
          <DescriptionListItem title="Token">
            <span>{table?.token}</span>
          </DescriptionListItem>
        </DescriptionList>
      </Box>
      <div className="py-8">
        <div className="flex items-center justify-between flex-wrap py-4">
          <PageTitle title="Current Orders" />
          {!!orders?.length && (
            <Button disabled={isPending} onClick={markAsPaid}>
              Mark as paid
            </Button>
          )}
        </div>
        <DataTable
          columns={tableOrdersColumns}
          data={orders || []}
          isFetching={isLoading}
          tableFooter={
            <TableRow className="border-t-2 justify-end bg-card">
              <TableCell></TableCell>
              <TableCell className="font-semibold">TOTAL</TableCell>
              <TableCell className="text-primary">{`(${sum(
                orders?.map(order => order.total),
              )})`}</TableCell>
            </TableRow>
          }
        />
      </div>
    </div>
  );
};

export default TableDetail;
