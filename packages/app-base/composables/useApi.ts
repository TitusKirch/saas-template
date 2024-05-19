import { FetchError } from 'ofetch'
import type { FetchResult, UseFetchOptions } from '#app'
import type { NitroFetchRequest, AvailableRouterMethod } from 'nitropack'

// @ts-ignore
import { KeysOf } from 'nuxt/dist/app/composables/asyncData'

export default function () {
  // request
  const getRequest = ({ path }: { path: string }) => {
    const runtimeConfig = useRuntimeConfig()

    return `${runtimeConfig.public.apiUrl}/${path}`
  }

  // csrf token
  const getCsrfToken = () => {
    return useCookie('XSRF-TOKEN').value
  }
  const fetchCsrfToken = async () => {
    // check if csrf token exists
    if (getCsrfToken()) {
      return
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
    )
  }

  // fetch
  const csrfFetch = <
    ResT = void,
    ErrorT = FetchError,
    ReqT extends NitroFetchRequest = NitroFetchRequest,
    Method extends AvailableRouterMethod<ReqT> = ResT extends void
      ? 'get' extends AvailableRouterMethod<ReqT>
        ? 'get'
        : AvailableRouterMethod<ReqT>
      : AvailableRouterMethod<ReqT>,
    _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
    DataT = _ResT,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
    DefaultT = null,
  >(
    request: Ref<ReqT> | ReqT | (() => ReqT),
    opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>
  ) => {
    const options = opts || {}
    return useFetch<DataT, ErrorT>(request, {
      ...(options as any),
      headers: {
        ...options.headers,
        'X-XSRF-TOKEN': getCsrfToken() || '',
      },
      credentials: 'include',
    })
  }

  // fetch
  const fetchData = <ResT = void, ErrorT = ApiErrorResponse<ResT>>(
    request: string,
    opts?: UseFetchOptions<ResT>
  ) => {
    // try to auto apply getRequest
    let req = request
    if (typeof req === 'string' && !req.startsWith('http')) {
      req = getRequest({ path: req })
    }

    return csrfFetch<ResT, FetchError<ErrorT>>(req, {
      ...opts,
    } as any)
  }

  // methods
  const getData = <ResT = void, ErrorT = ApiErrorResponse<ResT>>(
    request: string,
    opts?: UseFetchOptions<ResT>
  ) => {
    return fetchData<ResT, ErrorT>(request, {
      ...opts,
      method: 'GET',
    })
  }
  const postData = <ResT = void, ErrorT = ApiErrorResponse<ResT>>(
    request: string,
    opts?: UseFetchOptions<ResT>
  ) => {
    return fetchData<ResT, ErrorT>(request, {
      ...opts,
      method: 'POST',
    })
  }
  const putData = <ResT = void, ErrorT = ApiErrorResponse<ResT>>(
    request: string,
    opts?: UseFetchOptions<ResT>
  ) => {
    return fetchData<ResT, ErrorT>(request, {
      ...opts,
      method: 'PUT',
    })
  }
  const patchData = <ResT = void, ErrorT = ApiErrorResponse<ResT>>(
    request: string,
    opts?: UseFetchOptions<ResT>
  ) => {
    return fetchData<ResT, ErrorT>(request, {
      ...opts,
      method: 'PATCH',
    })
  }
  const deleteData = <ResT = void, ErrorT = ApiErrorResponse<ResT>>(
    request: string,
    opts?: UseFetchOptions<ResT>
  ) => {
    return fetchData<ResT, ErrorT>(request, {
      ...opts,
      method: 'DELETE',
    })
  }

  return {
    getRequest,
    fetchCsrfToken,
    fetch,
    getData,
    postData,
    putData,
    patchData,
    deleteData,
  }
}
