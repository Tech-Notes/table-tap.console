import PageTitle from '@/components/page-title';
import {PageShell} from '@/components/shell';
import {PageProps} from '@/types';
import HydratedTableDetail from './hydrated-table-detail';

export default async function TableDetailPage({params}: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  return (
    <PageShell>
      <PageTitle prefix="Tables" prefixLink="/tables" title={`#${id}`} />
      <HydratedTableDetail id={id} />
    </PageShell>
  );
}
