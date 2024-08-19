import type { FetchUrl, FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function <
  RequestDataT = ApiRequestData,
  ResponseT = ApiResponse | ApiResourceResponse,
  ErrorT = ApiErrorResponse<RequestDataT>,
>(url: FetchUrl, opts: FetchOptions<ResponseT> = {}) {
  const { _lazyFetch } = useApi();
  return _lazyFetch<RequestDataT, ResponseT, ErrorT>(url, opts);
}
