'use client';
import {createTable} from '@/api/tables';
import {ApiError} from '@/base';
import {clientFn} from '@/clientFn';
import NumberInput from '@/components/number-input';
import {
  OwFormControl,
  OwFormField,
  OwFormItem,
  OwFormLabel,
  OwFormMessage,
} from '@/components/ui-overwrite/form';
import {Button} from '@/components/ui/button';
import {Form} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {TableFormValues} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import z from 'zod';

interface Props {
  defaultValues: TableFormValues;
}

const formSchema = z.object({
  table_no: z
    .number()
    .min(1, 'Invalid table number. It has to be positive number'),
  description: z.string().min(0),
});

const CreateOrEditTableForm: React.FC<Props> = ({defaultValues}) => {
  const form = useForm<any, any, TableFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const router = useRouter();
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: TableFormValues) => {
      return await clientFn(createTable, data)();
    },
    onSuccess: () => {
      toast.success('New table is created.');
      router.push('/tables');
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Failed to create table.');
    },
  });

  const onSubmit = (formValues: TableFormValues) => {
    mutate(formValues);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <OwFormField
            control={form.control}
            name="table_no"
            render={({field: {onChange, ...props}}) => {
              return (
                <OwFormItem>
                  <OwFormLabel>Table No.</OwFormLabel>
                  <OwFormControl>
                    <NumberInput
                      placeholder="Enter table number..."
                      onChange={onChange}
                      {...props}
                    />
                  </OwFormControl>
                  <OwFormMessage />
                </OwFormItem>
              );
            }}
          />
          <OwFormField
            control={form.control}
            name="description"
            render={({field}) => {
              return (
                <OwFormItem>
                  <OwFormLabel>Description</OwFormLabel>
                  <OwFormControl>
                    <Textarea placeholder="Description..." {...field} />
                  </OwFormControl>
                </OwFormItem>
              );
            }}
          />
          <div className="py-2">
            <Button disabled={isPending}>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrEditTableForm;
