'use client';
import Box from '@/components/box';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {useMutation} from '@tanstack/react-query';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { useForm } from 'react-hook-form';

interface Props {
  callbackUrl: string;
}

const SigninForm: React.FC<Props> = ({callbackUrl}) => {
  const form = useForm({defaultValues: {email: '', password: ''}});
  const {push} = useRouter();
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: any) => {
      await signIn('credentials', {
        ...data,
      });
    },
    onSuccess: () => {
      push(callbackUrl || '/dashboard');
    },
    onError: error => {
      console.error('Sign in failed:', error);
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    mutate(data);
  };

  return (
    <Box>
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          // eslint-disable-next-line react/jsx-no-bind
          render={({field}) => (
            <FormItem className="my-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          // eslint-disable-next-line react/jsx-no-bind
          render={({field}) => (
            <FormItem className="my-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
          Sign In
        </Button>
      </Form>
    </Box>
  );
};

export default SigninForm;
