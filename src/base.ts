type ErrorCode = 'generic'

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
  headers: HeadersInit = {},
  params: TParams,
  method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' = 'GET',
): Promise<ResponseT<TResult>> => {

  let rUrl = url;

  if (method === 'GET' || method === 'DELETE') {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    rUrl += `?${queryString}`;
  }

  const body = method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(params) : undefined;

  try {
    const response = await fetch(rUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body
  });


  const data = await response.json()
  return data as ResponseT<TResult>;
    
  } catch (error) {
    console.log(error)
      return {
      status: 'error',
      error: new ApiError({code: 'generic', message: 'Unknown'}),
    } as ResponseT<TResult>;
  }
}