import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, retryWhen, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { ILoginRequest } from '@models/loginRequest';
import { SnackBarComponent } from 'src/common-ui/snackbar/snackbar.component';
import { OtpComponent } from '../../components/otp-dialog/otp.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: [''],
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
    return this.loginForm.controls;
  }

  login() {
    const loginRequest: ILoginRequest = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this.authService
      .login(loginRequest)
      .pipe(
        retryWhen(this.invalidOtp(loginRequest)),
        switchMap(() => this.authService.getCurrentUser$()),
      )
      .subscribe((user) =>
        this.router.navigate([
          user?.roles && this.authService.getInitialPathForRole(user.roles),
        ]),
      );
  }

  loginToYandex() {
    this.authService.loginToYandex().subscribe((res) => {
      console.log('>>>>>>>>>>loginToYandex', res);
    });
  }

  loginToGoogle() {
    this.authService.loginToGoogle().subscribe((res) => {
      console.log('>>>>>>>>>>loginToGoogle', res);
    });
  }

  private invalidOtp(loginRequest: ILoginRequest) {
    return (errors: Observable<HttpErrorResponse>) =>
      errors.pipe(
        filter((err) => err.error.msg === 'OTP_REQUIRED'),
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
