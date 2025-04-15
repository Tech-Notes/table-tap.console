import PageTitle from '@/components/page-title';
import {PageShell} from '@/components/shell';
import HydratedTableList from './hydrated-table-list';

export const metadata = {
  title: 'Tables',
  description: 'Tables',
};

export default function TablesPage() {
  return (
    <PageShell>
      <PageTitle title="Tables" />
      <HydratedTableList />
    </PageShell>
  );
}
