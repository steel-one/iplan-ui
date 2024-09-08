import { Role } from './types';

export class User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  repeatPassword?: string;
  roles?: Role[];
  confirmed?: boolean;
}
