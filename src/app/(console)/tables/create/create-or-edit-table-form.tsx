'use client';
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
import {useForm} from 'react-hook-form';
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

  const onSubmit = (formValues: TableFormValues) => {
    console.log('form values: ', formValues);
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
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrEditTableForm;
