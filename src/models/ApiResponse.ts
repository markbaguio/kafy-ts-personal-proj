export type ApiResponse<T> = {
  statusCode: number;
  data: T | null;
  message?: string;
  error?: unknown;
  errorName?: string;
};
export class ApiErrorResponse<TErrorDetails = unknown> extends Error {
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

export type UnexpectedErrorDetails = {
  name: string;
  message: string;
  stack: string;
};

export type AuthSessionMissingErrorDetails = {
  name: string;
  status: string;
  _isAuthError: boolean;
};
