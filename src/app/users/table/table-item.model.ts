export interface TableItem {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isBlocked: boolean;
  isConfirmed: boolean;
  roles: string[];
}
