import { Role } from './types';

export class User {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  roles?: Role[];
  confirmed?: boolean;
}
