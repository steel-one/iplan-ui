import { Component, Inject } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'frontend-app-confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        MatError,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
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
