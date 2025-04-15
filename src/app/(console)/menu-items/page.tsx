import PageTitle from '@/components/page-title';
import {PageShell} from '@/components/shell';
import HydratedMenuItemList from './hydrated-menu-item-list';

export const metadata = {
  title: 'Menu Items',
  description: 'Menu Items',
};
export default function MenuItemsPage() {
  return (
    <PageShell>
      <PageTitle title="Menu Items" />
      <HydratedMenuItemList />
    </PageShell>
  );
}
