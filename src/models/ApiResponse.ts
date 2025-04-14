export type ApiResponse<T> = {
  statusCode: number;
  data: T | null;
  message?: string;
  error?: unknown;
  errorName?: string;
};

// export interface ApiErrorResponse extends Error {
//   statusCode: number;
//   errorName: string;
//   message: string;
// }

export class ApiError<TErrorDetails = unknown> extends Error {
  constructor(
    public statusCode: number,
    public errorName: string,
    message: string,
    public errorDetails?: TErrorDetails
  ) {
    super(message);
    this.name = errorName;
  }
}

//? EXPECTED ERRORS FROM THE BACKEND.
export type ZodErrorDetails = {
  formErrors: string[];
  fieldErrors: Record<string, string[]>;
};

export type AuthApiErrorDetails = {
  __isAuthError: boolean;
  name: string;
  status: number;
  code: string;
};

export type GenericErrorDetails = {
  name: string;
  message: string;
  stack: string;
};
