import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'frontend-app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  form: UntypedFormGroup;
  nameCtrl = new UntypedFormControl('', [
    Validators.required,
    this.nameValidator(),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; name: string },
  ) {
    this.form = new UntypedFormGroup({
      name: this.nameCtrl,
    });
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (control.value === this.data.name) {
        return null;
      }
      return { nameWrongValue: true };
    };
  }
}
