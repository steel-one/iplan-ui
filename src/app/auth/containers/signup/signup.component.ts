import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { getFormControlError } from '@functions/getFormControlError';
import { BehaviorSubject } from 'rxjs';
import { TrimDirective } from '@lib/component-tools/trim-directive';
import { LoaderComponent } from '../../../../common-ui/loader/loader.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    LoaderComponent,
    ReactiveFormsModule,
    MatFormField,
    TrimDirective,
    MatInput,
    MatError,
    MatLabel,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatButton,
    RouterLink,
    AsyncPipe,
  ],
})
export class SignupComponent {
  loading$ = new BehaviorSubject(false);

  fg!: FormGroup;

  hide = signal(true);
  hideRepeat = signal(true);

  errorMessage = signal('');

  hideShowPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideShowRepeatPassword(event: MouseEvent) {
    this.hideRepeat.set(!this.hideRepeat());
    event.stopPropagation();
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.fg = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.fg.controls;
  }

  getErrorMessage(controlName: string): string {
    return getFormControlError(this.fg, controlName);
  }

  signup() {
    this.loading$.next(true);
    this.authService
      .signup({
        firstName: this.f['firstName'].value,
        lastName: this.f['lastName'].value,
        email: this.f['email'].value,
        password: this.f['password'].value,
        repeatPassword: this.f['repeatPassword'].value,
      })
      .subscribe({
        next: () => this.router.navigate([this.authService.CONFIRM_PATH]),
        error: (error) => {
          this.errorMessage.set(
            Array.isArray(error.error?.message)
              ? error.error?.message[0]
              : error.error?.message,
          );
        },
      });
  }
}
