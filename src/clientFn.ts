import { ResponseT } from "./base";
import { ApiFn } from "./serverFn";

export const clientFn = <TArguments extends TArguments[], TResult extends ResponseT<TResult>>(
    func: ApiFn<TArguments, TResult>,
  ...args: TArguments
) => {
    const baseURL = '/api';
  return async () => {
    const response = await func(baseURL, {}, ...args)
    return response;
  }
}