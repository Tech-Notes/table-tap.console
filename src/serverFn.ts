import { ResponseT } from "./base";

export type ApiFn<TArguments extends TArguments[],TResult extends ResponseT<TResult>> = (baseUrl: string, headers: HeadersInit, ...args: TArguments) => Promise<TResult>

const serverFn = <TArguments extends TArguments[],TResult extends ResponseT<TResult>>(func: ApiFn<TArguments,TResult>, args: TArguments) => {
  const baseURL = process.env.API_BASE as string;

  return async () => {
    const response = await func(baseURL, {}, ...args)
    return response;
  }
}
export default serverFn;