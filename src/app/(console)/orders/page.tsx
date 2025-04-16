import PageTitle from '@/components/page-title';
import {PageShell} from '@/components/shell';
import HydratedOrderList from './hydrated-order-list';

export const metadata = {
  title: 'Orders',
  description: 'Orders',
};
export default function OrdersPage() {
  return (
    <PageShell>
      <PageTitle title="Orders" />
      <HydratedOrderList />
    </PageShell>
  );
}
