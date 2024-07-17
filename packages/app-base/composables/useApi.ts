import type { FetchUrl, FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const _fetch = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    const options = opts || {};
    if (!options.version && options.version !== false) {
      options.version = 'v1';
    }

    return useFetch<
      ResponseT,
      {
        data: ErrorT;
      }
    >(url, {
      ...options,
      $fetch: useNuxtApp().$apiClient,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return {
    _fetch,
  };
}
