import { AbstractControl, FormGroup } from '@angular/forms';

export function getFormControlError(
  fg: FormGroup,
  controlName: string,
): string {
  const control: AbstractControl | null = fg.get(controlName);
  const errors = control?.errors;

  if (errors) {
    if (errors['required']) {
      return 'Field is required.';
    }
    if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength} characters.`;
    }
    if (errors['email']) {
      return 'Invalid email address.';
    }
  }
  return '';
}
