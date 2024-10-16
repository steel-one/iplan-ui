import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TrimDirective } from '@lib/component-tools/trim-directive';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    MatLabel,
    TrimDirective,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatDialogActions,
    MatButton,
  ],
})
export class OtpComponent {
  constructor(
    private dialogRef: MatDialogRef<OtpComponent>,
    @Inject(MAT_DIALOG_DATA) public otpValue: string,
  ) {}

  verify(result: string) {
    this.dialogRef.close(result);
  }
}
