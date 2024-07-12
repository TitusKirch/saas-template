type ApiRequestData<DataT = unknown> = DataT;

type ApiResourceResponse<DataT = unknown> = {
  data: DataT;
};
type ApiResponse<DataT = unknown> = DataT;

type ApiMessageResponse = {
  message: string;
};

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
