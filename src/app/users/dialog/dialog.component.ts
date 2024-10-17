import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getFormControlError } from '@functions/getFormControlError';
import { TrimDirective } from '@lib/component-tools/trim-directive';
import { DialogData, FormValue } from './dialog-data';
import { DialogService } from './dialog.service';
import { JwtAuthStrategy } from 'src/app/auth/services/jwt-auth.strategy';

@Component({
  selector: 'frontend-section-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [DialogService, JwtAuthStrategy],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    NgIf,
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    TrimDirective,
    MatInput,
    MatError,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class DialogComponent {
  errorMessage = signal('');

  public fg: FormGroup;

  constructor(
    public dialogSrv: DialogService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
  ) {
    this.fg = this.fb.group({
      id: new FormControl(''),
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.fg.patchValue(dialogData.user as FormValue);
  }

  getErrorMessage(controlName: string): string {
    return getFormControlError(this.fg, controlName);
  }

  save() {
    const fgValue = this.fg.value;
    this.fg.disable();
    if (fgValue.id) {
      return this.dialogSrv.update(fgValue as FormValue).subscribe(
        () => {
          this.snackBar.open(`User was successfully updated`, `Close`, {
            duration: 5000,
          });
          this.dialogRef.close();
        },
        (e) => {
          const error = Array.isArray(e.error?.message)
            ? e.error?.message[0]
            : e.error?.message;
          const message = error || `There was an unexpected error.`;
          this.snackBar.open(message, `Close`, { duration: 10000 });
          this.errorMessage.set(error);
          this.fg.enable();
          throw e;
        },
      );
    }
    return;
  }
}
