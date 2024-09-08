import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  loading$ = new BehaviorSubject(false);

  signupForm!: FormGroup;

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
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.minLength(3)],
      lastName: ['', Validators.minLength(1)],
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)],
      repeatPassword: ['', Validators.minLength(8)],
    });
  }

  get f() {
    return this.signupForm.controls;
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
