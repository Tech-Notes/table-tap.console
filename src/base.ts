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

export const fetchJSON = async <T>(
  url: string,
  headers: HeadersInit = {},
  method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' = 'GET',
): Promise<ResponseT<T>> => {
  try {
    const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  const data = await response.json()
  return data as ResponseT<T>;
    
  } catch (error) {
    console.log(error)
      return {
      status: 'error',
      error: new ApiError({code: 'generic', message: 'Unknown'}),
    } as ResponseT<T>;
  }
}