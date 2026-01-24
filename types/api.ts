export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface ApiError {
  message: string
  code?: string
}
