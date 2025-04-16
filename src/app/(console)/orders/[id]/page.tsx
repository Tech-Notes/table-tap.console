import PageTitle from '@/components/page-title';
import {PageShell} from '@/components/shell';
import {PageProps} from '@/types';
import HydratedOrderDetail from './hydrated-order-detail';

export default async function OrderDetailPage({params}: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  return (
    <PageShell>
      <PageTitle prefix="Orders" prefixLink="/orders" title={`#${id}`} />
      <HydratedOrderDetail id={id} />
    </PageShell>
  );
}
