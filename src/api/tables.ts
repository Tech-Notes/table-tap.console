import {fetchJSON} from '@/base';
import {Table} from '@/types';
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
