'use client';
import Box from '@/components/box';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import z from 'zod';

interface Props {
  callbackUrl: string;
}

const formSchema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(1, {message: 'Password is required'}),
});

const SigninForm: React.FC<Props> = ({callbackUrl}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {email: '', password: ''},
  });
  const {push} = useRouter();
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: any) => {
      const signInResult = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: callbackUrl || '/dashboard',
      });
      if (signInResult?.status !== 200) {
        toast.error('Sign in failed. Please check your credentials.');
      }
    },
    onSuccess: () => {
      push(callbackUrl || '/dashboard');
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <Box>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}>
            Sign In
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default SigninForm;
