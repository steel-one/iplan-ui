export interface ISingUpRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  confirmed?: boolean;
}
