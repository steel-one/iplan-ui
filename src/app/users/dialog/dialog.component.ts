import { Component, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getFormControlError } from '@common/functions/getFormControlError';
import { DialogData, FormValue } from './dialog-data';
import { DialogService } from './dialog.service';

@Component({
  selector: 'frontend-section-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [DialogService],
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
