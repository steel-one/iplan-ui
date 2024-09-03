import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AUTH_TYPE } from '../app-config.service';
import { AuthService } from './services/auth.service';
import { AUTH_STRATEGY } from './services/auth.strategy';
import { JwtAuthStrategy } from './services/jwt-auth.strategy';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy,
    @Inject(AUTH_TYPE) private authUrl: string,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.authUrl === 'token' && this.jwt && this.jwt.getToken()) {
      // @ts-ignore
      request = this.addToken(request, this.jwt.getToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.doLogoutAndRedirectToLogin();
        }
        return throwError(error);
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}
