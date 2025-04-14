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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SigninForm = () => {
  const form = useForm();
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log('value', value);
  }, [value]);

  return (
    <Box>
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          // eslint-disable-next-line react/jsx-no-bind
          render={({field}) => (
            <FormItem className='my-4'>
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
            <FormItem className='my-4'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter your password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Sign In</Button>
      </Form>
    </Box>
  );
};

export default SigninForm;
