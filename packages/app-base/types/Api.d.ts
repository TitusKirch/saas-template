type ApiRequest = {}

type ApiResponse = {}

type ApiErrorResponse<ReqT = ApiRequest> = {
  message: string
  errors: Record<keyof ReqT, string[]>
}
