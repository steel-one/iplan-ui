import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { config } from './config';
import { HttpErrorHandler } from './error.handler';

export const httpErrorInterceptor: HttpInterceptorFn = (
  request,
  next: HttpHandlerFn,
) => {
  const handler = inject(HttpErrorHandler);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!isErrorMessageSuppressed(error)) {
        handler.handleError(error);
      }
      return throwError(() => error);
    }),
  );
};

function isErrorMessageSuppressed(error: HttpErrorResponse): boolean {
  return (
    isQueryForLoggedUser(error) ||
    isOtpRequired(error) ||
    isLogoutRequest(error)
  );
}

function isLogoutRequest(error: HttpErrorResponse): boolean {
  return !!error.url?.endsWith(`${config['AUTH_URL']}/logout`);
}

function isQueryForLoggedUser(error: HttpErrorResponse): boolean {
  return !!error.url?.includes(`${config['API_URL']}/users`);
}

function isOtpRequired(error: HttpErrorResponse): boolean {
  return error.error?.msg === 'OTP_REQUIRED';
}
