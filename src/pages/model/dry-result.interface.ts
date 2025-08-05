export interface DryResultatInterface<T = any> {
  status_code: number;
  success: boolean;
  status: boolean;
  data: T;
}
