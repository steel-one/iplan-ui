import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AUTH_URL } from './app-config.service';
import { HttpErrorHandler } from './error.handler';

export const httpErrorInterceptor: HttpInterceptorFn = (
  request,
  next: HttpHandlerFn,
) => {
  const handler = inject(HttpErrorHandler);
  const authUrl = inject(AUTH_URL);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!isErrorMessageSuppressed(error, authUrl)) {
        handler.handleError(error);
      }
      return throwError(() => error);
    }),
  );
};

function isErrorMessageSuppressed(
  error: HttpErrorResponse,
  authUrl: string,
): boolean {
  return (
    isQueryForLoggedUser(error, authUrl) ||
    isOtpRequired(error) ||
    isLogoutRequest(error, authUrl)
  );
}

function isLogoutRequest(error: HttpErrorResponse, authUrl: string): boolean {
  return !!error.url?.endsWith(`${authUrl}/logout`);
}

function isQueryForLoggedUser(
  error: HttpErrorResponse,
  authUrl: string,
): boolean {
  return !!error.url?.endsWith(`${authUrl}/user`);
}

function isOtpRequired(error: HttpErrorResponse): boolean {
  return error.error?.msg === 'OTP_REQUIRED';
}
