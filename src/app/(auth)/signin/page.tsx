import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import {PageProps} from '@/types/types';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import SigninForm from './signin-form';

const SigninPage = async () => {
  const callbackUrl = '/dashboard';

  const session = await getServerSession(authOptions);
  if (!!session) {
    redirect(callbackUrl || '/dashboard');
  }
  return <SigninForm callbackUrl={callbackUrl || '/dashboard'} />;
};

export default SigninPage;
