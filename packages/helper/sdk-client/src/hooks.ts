/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export { useQuery };
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export function useSDKQuery<
  SDK,
  Method extends FunctionKeys<SDK>,
  Params extends Parameters<
    SDK[Method] extends (...args: any) => any ? SDK[Method] : never
  >,
  Result extends Awaited<
    ReturnType<SDK[Method] extends (...args: any) => any ? SDK[Method] : never>
  >,
>(
  sdkInstance: SDK,
  methodName: Method,
  params: Params,
  options?: Omit<
    UseQueryOptions<Result, unknown, Result, [Method, ...Params]>,
    "queryFn" | "queryKey"
  >,
) {
  return useQuery<Result, unknown, Result, [Method, ...Params]>({
    queryKey: [methodName, ...params],
    queryFn: () =>
      (
        sdkInstance[methodName] as unknown as (
          ...args: Params
        ) => Promise<Result>
      )(...params),
    ...options,
  });
}
