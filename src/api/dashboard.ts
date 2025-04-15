import {fetchJSON} from '@/base';
import {GenerateHMACSignatureHeaderFn} from '@/types/types';

export const checkApiHealth = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  params: any,
) => {
  return fetchJSON<any, any>(`${baseUrl}/healthCheck`, headerFn, params, 'GET');
};
