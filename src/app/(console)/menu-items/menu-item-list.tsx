'use client';

import {getMenuItemList} from '@/api/menu-items';
import {menuItemsKeys} from '@/api/query-keys/menu-items';
import {clientFn} from '@/clientFn';
import {DataTable} from '@/components/data-table';
import {MenuItemListResponse} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {menuItemListColumns} from './menu-item-list-columns';

const MenuItemList = () => {
  const {data, isLoading} = useQuery({
    queryKey: menuItemsKeys.list(),
    queryFn: clientFn<any, MenuItemListResponse>(getMenuItemList, {}),
  });

  return (
    <div>
      <DataTable
        columns={menuItemListColumns}
        data={data?.data.menu_items || []}
        isFetching={isLoading}
      />
    </div>
  );
};

export default MenuItemList;
