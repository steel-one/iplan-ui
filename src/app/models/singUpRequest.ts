export interface ISingUpRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  repeat_password: string;
  confirmed?: boolean;
}
