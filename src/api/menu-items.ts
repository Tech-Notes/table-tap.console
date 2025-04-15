import {fetchJSON} from '@/base';
import {MenuItemListResponse} from '@/types';
import {GenerateHMACSignatureHeaderFn} from '@/types/types';

export const getMenuItemList = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  params: any,
) => {
  return fetchJSON<MenuItemListResponse, any>(
    `${baseUrl}/menu_items`,
    headerFn,
    params,
    'GET',
  );
};
