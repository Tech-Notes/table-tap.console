import {fetchJSON} from '@/base';
import {Table, TableDetailResponse} from '@/types';
import {GenerateHMACSignatureHeaderFn} from '@/types/types';

export const getTableList = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  params: any,
) => {
  return fetchJSON<{tables: Table[]}, any>(
    `${baseUrl}/tables`,
    headerFn,
    params,
    'GET',
  );
};

export const getTableDetail = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  id: number,
  params: any,
) => {
  return fetchJSON<TableDetailResponse, any>(
    `${baseUrl}/tables/${id}`,
    headerFn,
    params,
    'GET',
  );
};
