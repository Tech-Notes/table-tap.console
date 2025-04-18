import Box from '@/components/box';
import PageTitle from '@/components/page-title';
import { PageShell } from '@/components/shell';
import { TableFormValues } from '@/types';
import CreateOrEditTableForm from './create-or-edit-table-form';

const CreateTablePage = () => {
  const defaultValues: TableFormValues = {
    table_no: 0,
    description: ""
  }
  return (
    <PageShell>
      <PageTitle title="New Table" />
      <Box>
        <CreateOrEditTableForm defaultValues={defaultValues} />
      </Box>
    </PageShell>
  );
};

export default CreateTablePage;
