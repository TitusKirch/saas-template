import type { FetchUrl, FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const fetchWrapper = <
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

    console.info('fetchWrapper', url, options);

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

  // methods
  const get = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(url, {
      ...opts,
      method: 'GET',
    });
  };
  const post = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(url, {
      ...opts,
      method: 'POST',
    });
  };
  const put = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(url, {
      ...opts,
      method: 'PUT',
    });
  };
  const patch = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(url, {
      ...opts,
      method: 'PATCH',
    });
  };
  const _delete = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(url, {
      ...opts,
      method: 'DELETE',
    });
  };

  return {
    fetchWrapper,
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
}
