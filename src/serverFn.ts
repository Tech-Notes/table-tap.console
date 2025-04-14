import {getServerSession} from 'next-auth';
import {authOptions} from './app/api/auth/[...nextauth]/authOptions';
import {ResponseT} from './base';
import {generateHMACSignature} from './hmacSignature';
import {GenerateHMACSignatureHeaderFn} from './types/types';

export type ApiFn<TArguments extends any[], TResult extends ResponseT<any>> = (
  baseUrl: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  ...args: TArguments
) => Promise<TResult>;

const serverFn = <TArguments extends any[], TResult extends ResponseT<any>>(
  func: ApiFn<TArguments, TResult>,
  ...args: TArguments
) => {
  const baseURL = process.env.API_BASE as string;

  return async () => {
    const serverSession = await getServerSession(authOptions);
    const headerFn: GenerateHMACSignatureHeaderFn = (requestInfo: string) => {
      return {
        'X-HMAC-SIGNATURE': generateHMACSignature(requestInfo),
        'X-USER-EMAIL': serverSession?.email as string,
      };
    };
    const response = await func(baseURL, headerFn, ...args);
    return response;
  };
};
export default serverFn;
