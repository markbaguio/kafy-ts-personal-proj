export type ApiResponse<T> = {
  // statusCode: number;
  data: T | null;
  message?: string;
  error?: unknown;
  errorName?: string;
};

export interface ApiErrorResponse extends Error {
  statusCode: number;
  errorName: string;
  message: string;
}
