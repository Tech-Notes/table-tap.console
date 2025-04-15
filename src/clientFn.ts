import {ResponseT} from './base';
import {ApiFn} from './serverFn';
import {emptyHeader} from './types/types';

export const clientFn = <
  TArguments extends any[],
  TResult,
>(
  func: ApiFn<TArguments, TResult>,
  ...args: TArguments
) => {
  const baseURL = '/api';
  return async () => {
    const response = await func(baseURL, emptyHeader, ...args);
    if (response.status === 'error') {
      throw response.error;
    }
    return response;
  };
};
