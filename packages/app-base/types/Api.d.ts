type ApiRequestData<DataT = unknown> = DataT;

type ApiResourceResponseLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

type ApiResourceResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

type ApiResourceResponse<DataT = unknown> = {
  data: DataT;
  links: ApiResourceResponseLinks;
  meta: ApiResourceResponseMeta;
};
type ApiResponse<DataT = unknown> = DataT;

type ApiMessageResponse = {
  message: string;
};
type ApiPresignedUrlResponse = ApiResourceResponse<{
  presignedUrl: string;
}>;
type ApiConfirmablePresignedUrlResponse = ApiPresignedUrlResponse &
  ApiResourceResponse<{
    confirmationUrl: string;
  }>;

type ApiErrorResponse<RequestDataT = ApiRequestData<unknown>> = ApiMessageResponse & {
  errors: RequestDataT extends unknown
    ? Record<string, string[]>
    : Record<keyof RequestDataT, string[]>;
};

type ApiFetchOptions = {
  version?: string | false;
  setCsrfToken?: boolean;
};

type ApiRequestDataTurnstile = {
  'cf-turnstile-response': string;
};
