import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from './auth.interceptor';
import { OtpComponent } from './components/otp-dialog/otp.component';
import { ConfirmComponent } from './containers/confirm/confirm.component';
import { LoginComponent } from './containers/login/login.component';
import { OAuthComponent } from './containers/oauth/oauth.component';
import { PasswordComponent } from './containers/password/password.component';
import { RecoverComponent } from './containers/recover/recover.component';
import { SignupComponent } from './containers/signup/signup.component';
import { ForRolesDirective } from './directives/for-roles.directive';
import { authStrategyProvider } from './services/auth.strategy';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmComponent,
    ForRolesDirective,
    PasswordComponent,
    RecoverComponent,
    OAuthComponent,
    OtpComponent,
  ],
  exports: [ForRolesDirective],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    authStrategyProvider,
  ],
})
export class AuthModule {}
