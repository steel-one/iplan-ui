import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '@models/user';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { JwtAuthStrategy } from 'src/app/auth/services/jwt-auth.strategy';
import { RefreshService } from '../section';
import { config } from './../../config';
import { FormValue } from './dialog-data';

@Injectable()
export class DialogService {
  constructor(
    private http: HttpClient,
    private refreshSrv: RefreshService,
    private jwt: JwtAuthStrategy,
  ) {}

  update(user: FormValue) {
    const token = this.jwt.getToken();
    return this.http
      .put<User>(
        `${config['API_URL']}/users/${user.email}`,
        {
          user,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .pipe(
        map((response: any) => {
          if (response.errors) {
            throw response.errors[0];
          }
          this.refreshSrv.refresh();
          return response;
        }),
        catchError((err) => {
          const error = {
            ...err?.extensions?.exception?.error,
            payload: user,
          };
          return of(error.message).pipe(
            mergeMap((message) => throwError({ id: user.id, message })),
          );
        }),
      );
  }
}
