import type { UseFetchOptions } from '#app';

export type FetchUrl = string | (() => string);
export type FetchOptions<ResponseT> = Omit<
  ApiFetchOptions & UseFetchOptions<ResponseT>,
  'default'
> & {
  default?: () => ResponseT | Ref<ResponseT>;
  version?: string | boolean;
};
