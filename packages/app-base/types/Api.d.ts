type ApiRequestData<DataT = unknown> = DataT;

type ApiResourceResponse<DataT = unknown> = {
  data: DataT;
};
type ApiResponse<DataT = unknown> = DataT;

type ApiErrorResponse<RequestDataT = ApiRequestData<unknown>> = {
  message: string;
  errors: RequestDataT extends unknown
    ? Record<string, string[]>
    : Record<keyof RequestDataT, string[]>;
};

type ApiFetchOptions = {
  prefix?: string;
  version?: string;
};
