export interface CustomResponse<T> {
  data: T;
  message: string;
  succeeded: boolean;
  errors: string[];
}
