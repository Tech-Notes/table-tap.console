import {getMenuItemList} from '@/api/menu-items';
import {menuItemsKeys} from '@/api/query-keys/menu-items';
import getQueryClient from '@/getQueryClient';
import serverFn from '@/serverFn';
import {MenuItemListResponse} from '@/types';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import MenuItemList from './menu-item-list';

const HydratedMenuItemList = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: menuItemsKeys.list(),
    queryFn: serverFn<any, MenuItemListResponse>(getMenuItemList, {}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <MenuItemList />
    </HydrationBoundary>
  );
};
export default HydratedMenuItemList;
