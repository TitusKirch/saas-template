import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const getSearch = ({
    params,
    options,
  }: {
    params?: Ref<SearchRequestParams>;
    options?: FetchOptions<SearchResponse>;
  } = {}) =>
    useApiFetch<SearchRequestData, SearchResponse>('search', {
      params,
      ...options,
    });

  return {
    getSearch,
  };
}
