export interface FormValue {
  id: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface DialogData {
  user: FormValue;
}
