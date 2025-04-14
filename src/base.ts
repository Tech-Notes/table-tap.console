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

  if (method === 'GET' || method === 'DELETE') {
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
  console.log('URL:', urlObject);
  const rHeaders = headerFn(urlObject.pathname);

  try {
    const response = await fetch(rUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...rHeaders,
      },
      body: body,
    });

    const data = await response.json();
    if (data.status === 'success') {
      return data as ResponseT<TResult>;
    }

    throw new ApiError({
      code: data.error.code || 'generic',
      message: data.error.message || 'An error occurred',
    });
  } catch (error) {
    console.log(error);
    throw new ApiError({
      code: 'generic',
      message: 'An error occurred while fetching data',
    });
  }
};
