import type { UseFetchOptions } from '#app';

export default function () {
  // request
  const getRequest = ({ path }: { path: string }) => {
    const runtimeConfig = useRuntimeConfig();

    return `${runtimeConfig.public.apiUrl}/${path}`;
  };

  // csrf token
  const getCsrfToken = () => {
    return useCookie('XSRF-TOKEN').value || undefined;
  };
  const fetchCsrfToken = async () => {
    if (getCsrfToken()) {
      return;
    }

    await useFetch(
      getRequest({
        path: 'sanctum/csrf-cookie',
      }),
      {
        method: 'GET',
        credentials: 'include',
      }
    );
  };

  type FetchUrl = string | (() => string);
  type FetchOptions<ResponseT> = Omit<ApiFetchOptions & UseFetchOptions<ResponseT>, 'default'> & {
    default?: () => ResponseT | Ref<ResponseT>;
  };

  const fetchWrapper = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    url: FetchUrl,
    opts: FetchOptions<ResponseT> = {}
  ) => {
    const options = opts || {};
    if (!options.prefix) {
      options.prefix = 'api';
    }

    return useFetch<
      ResponseT,
      {
        data: ErrorT;
      }
    >(url, {
      ...options,
      $fetch: useNuxtApp().$api,
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
    getRequest,
    fetchCsrfToken,
    fetchWrapper,
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
}
