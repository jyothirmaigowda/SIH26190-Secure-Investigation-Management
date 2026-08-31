export interface ApiErrorPayload {
  message: string
  requestId?: string
  stack?: string
}

export interface ApiErrorResponse {
  success: false
  error: ApiErrorPayload
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export interface AuthenticatedUserContext {
  id: string
  role?: string
  service?: string
}

export interface RequestContext {
  id?: string
  user?: AuthenticatedUserContext | null
}
