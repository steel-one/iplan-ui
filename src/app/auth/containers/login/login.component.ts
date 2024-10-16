import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getFormControlError } from '@common/functions/getFormControlError';
import { ILoginRequest } from '@models/loginRequest';
import { SnackBarComponent } from 'src/common-ui/snackbar/snackbar.component';
import { OtpComponent } from '../../components/otp-dialog/otp.component';
import { AuthService } from '../../services/auth.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../../../common-ui/loader/loader.component';
import { MatFormField, MatError, MatLabel, MatSuffix } from '@angular/material/form-field';
import { TrimDirective } from '../../../../../projects/common/src/lib/component-tools/trim-directive';
import { MatInput } from '@angular/material/input';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./../auth.scss'],
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
export class LoginComponent implements OnInit {
  loading$ = new BehaviorSubject(false);

  fg!: FormGroup;

  hide = signal(true);

  hideShowPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    const msg = this.route.snapshot.queryParams['msg'];
    if (msg) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data: msg,
      });
    }
  }

  get f() {
    return this.fg.controls;
  }

  getErrorMessage(controlName: string): string {
    return getFormControlError(this.fg, controlName);
  }

  login() {
    const loginRequest: ILoginRequest = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };
    this.loading$.next(true);
    this.authService
      .login(loginRequest)
      .pipe(
        switchMap(() => this.authService.getCurrentUser$()),
        catchError((err) => {
          this.loading$.next(false);
          throw new HttpErrorResponse(err);
        }),
        // retryWhen(this.invalidOtp(loginRequest)), // TODO: meanwhile OTP case is not necessary
      )
      .subscribe((user) => {
        this.router.navigate([
          user?.roles && this.authService.getInitialPathForRole(user.roles),
        ]);
      });
  }

  loginToYandex() {
    this.authService.loginToYandex().subscribe((res: any) => {
      this.loading$.next(true);
      console.log('>>>>>>>>>>loginToYandex', res);
    });
  }

  loginToGoogle() {
    this.authService.loginToGoogle().subscribe((res) => {
      this.loading$.next(true);
      console.log('>>>>>>>>>>loginToGoogle', res);
    });
  }

  private invalidOtp(loginRequest: ILoginRequest) {
    return (errors: Observable<HttpErrorResponse>) =>
      errors.pipe(
        filter((err) => err?.error?.msg === 'OTP_REQUIRED'),
        switchMap(() => this.requestOtp()),
        tap((otp) => (loginRequest.otp = otp)),
      );
  }

  private requestOtp() {
    const config = {
      width: '400px',
      disableClose: true,
    };
    return this.dialog.open(OtpComponent, config).afterClosed();
  }
}
