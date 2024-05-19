import type { FetchError } from 'ofetch';
import type { FetchResult, UseFetchOptions } from '#app';
import type { NitroFetchRequest, AvailableRouterMethod } from 'nitropack';

// @ts-expect-error - types are not available
import type { KeysOf } from 'nuxt/dist/app/composables/asyncData';

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
    // check if csrf token exists
    if (getCsrfToken()) {
      return;
    }

    // fetch csrf token
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

  // csrf fetch
  // TODO: see https://github.com/TitusKirch/saas-template/issues/100
  const csrfFetch = <
    ResT = void,
    ErrorT = FetchError,
    ReqT extends NitroFetchRequest = NitroFetchRequest,
    Method extends AvailableRouterMethod<ReqT> = ResT extends unknown
      ? 'get' extends AvailableRouterMethod<ReqT>
        ? 'get'
        : AvailableRouterMethod<ReqT>
      : AvailableRouterMethod<ReqT>,
    _ResT = ResT extends unknown ? FetchResult<ReqT, Method> : ResT,
    DataT = _ResT,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
    DefaultT = null,
  >(
    request: Ref<ReqT> | ReqT | (() => ReqT),
    opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>
  ) => {
    const options = opts || {};
    return useFetch<DataT, ErrorT>(request, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(options as any),
      headers: {
        ...options.headers,
        'X-XSRF-TOKEN': getCsrfToken() || '',
      },
      credentials: 'include',
    });
  };

  // fetch
  const fetchWrapper = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    request: string,
    opts?: UseFetchOptions<ResponseT>
  ) => {
    // try to auto apply getRequest
    let req = request;
    if (typeof req === 'string' && !req.startsWith('http')) {
      req = getRequest({ path: req });
    }

    return csrfFetch<ResponseT, FetchError<ErrorT>>(req, {
      ...opts,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  // methods
  const get = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    request: string,
    opts?: UseFetchOptions<ResponseT>
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(request, {
      ...opts,
      method: 'GET',
    });
  };
  const post = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    request: string,
    opts?: UseFetchOptions<ResponseT>
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(request, {
      ...opts,
      method: 'POST',
    });
  };
  const put = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    request: string,
    opts?: UseFetchOptions<ResponseT>
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(request, {
      ...opts,
      method: 'PUT',
    });
  };
  const patch = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    request: string,
    opts?: UseFetchOptions<ResponseT>
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(request, {
      ...opts,
      method: 'PATCH',
    });
  };
  const _delete = <
    RequestDataT = ApiRequestData,
    ResponseT = ApiResponse | ApiResourceResponse,
    ErrorT = ApiErrorResponse<RequestDataT>,
  >(
    request: string,
    opts?: UseFetchOptions<ResponseT>
  ) => {
    return fetchWrapper<RequestDataT, ResponseT, ErrorT>(request, {
      ...opts,
      method: 'DELETE',
    });
  };

  return {
    getRequest,
    fetchCsrfToken,
    csrfFetch,
    fetchWrapper,
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
}
