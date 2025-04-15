import {isEmpty} from 'lodash-es';
import {GenerateHMACSignatureHeaderFn} from './types/types';

type ErrorCode = 'generic';

export class ApiError extends Error {
  code: ErrorCode;
  message: string;

  constructor({code, message}: {code: ErrorCode; message: string}) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export type ResponseT<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: ApiError;
    };

export const fetchJSON = async <TResult, TParams>(
  url: string,
  headerFn: GenerateHMACSignatureHeaderFn,
  params: TParams,
  method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' = 'GET',
): Promise<ResponseT<TResult>> => {
  let rUrl = url;

  if ((method === 'GET' || method === 'DELETE') && !isEmpty(params)) {
    const queryString = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    rUrl += `?${queryString}`;
  }

  const body =
    method === 'POST' || method === 'PUT' || method === 'PATCH'
      ? JSON.stringify(params)
      : undefined;

  const urlObject = new URL(rUrl);
  const rHeaders = headerFn(urlObject.pathname);

  console.log(`Executing query: ${rUrl}, method:${method}`);

  try {
    const response = await fetch(rUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...rHeaders,
      },
      body: body,
    });

    if (response.status >= 200 && response.status < 300) {
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      if (!!data) {
        return data as ResponseT<TResult>;
      }

      return {
        status: 'success',
        data: {} as TResult,
      };
    } else {
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      throw new ApiError({
        code: data.error.code || 'generic',
        message: data.error.message || 'An error occurred',
      });
    }
  } catch (error) {
    throw new ApiError({
      code: 'generic',
      message: 'An error occurred while fetching data',
    });
  }
};
