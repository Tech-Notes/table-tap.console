'use client';
import {tableKeys} from '@/api/query-keys/tables';
import {getTableDetail} from '@/api/tables';
import {clientFn} from '@/clientFn';
import Box from '@/components/box';
import {DataTable} from '@/components/data-table';
import {
  DescriptionList,
  DescriptionListItem,
} from '@/components/description-list';
import PageTitle from '@/components/page-title';
import TableStatusComp from '@/components/table-status';
import {TableDetailResponse} from '@/types';
import {useQuery} from '@tanstack/react-query';
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
        <div>
          <PageTitle title="Current Orders" />
        </div>
        <DataTable
          columns={tableOrdersColumns}
          data={orders || []}
          isFetching={isLoading}
        />
      </div>
    </div>
  );
};

export default TableDetail;
