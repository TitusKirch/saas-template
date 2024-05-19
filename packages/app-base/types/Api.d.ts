type ApiRequestData<DataT = void> = DataT;

type ApiResourceResponse<DataT = void> = {
  data: DataT;
};
type ApiResponse<DataT = void> = DataT;

type ApiErrorResponse<RequestDataT = ApiRequestData<void>> = {
  message: string;
  errors: RequestDataT extends void
    ? Record<string, string[]>
    : Record<keyof RequestDataT, string[]>;
};
