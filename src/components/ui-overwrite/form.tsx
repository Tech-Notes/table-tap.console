'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import {Slot} from '@radix-ui/react-slot';
import * as React from 'react';
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import {cn} from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const OwFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <FormField {...props} />;
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function OwFormItem({className, ...props}: React.ComponentProps<'div'>) {
  return (
    <FormItem
      className={cn(
        'flex flex-col md:grid md:grid-cols-3 lg:grid-cols-6',
        className,
      )}
      {...props}
    />
  );
}

function OwFormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <FormLabel
      className={cn('col-span-1 col-start-1 text-muted-foreground', className)}
      {...props}
    />
  );
}

function OwFormControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  return (
    <FormControl
      className={cn(
        'col-span-2 col-start-2 lg:col-start-2 lg:col-span-3',
        className,
      )}
      {...props}
    />
  );
}

function OwFormDescription({className, ...props}: React.ComponentProps<'p'>) {
  <FormDescription className={className} {...props} />;
}

function OwFormMessage({className, ...props}: React.ComponentProps<'p'>) {
  return (
    <FormMessage
      className={cn(
        'col-span-2 col-start-2 lg:col-start-2 lg:col-span-3',
        className,
      )}
      {...props}
    />
  );
}

export {
  OwFormControl,
  OwFormDescription,
  OwFormField,
  OwFormItem,
  OwFormLabel,
  OwFormMessage,
};
