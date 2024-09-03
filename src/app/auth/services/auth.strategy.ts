import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';
import { AUTH_TYPE } from 'src/app/app-config.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { SessionAuthStrategy } from './session-auth.strategy';

export interface AuthStrategy<T> {
  doLoginUser(data: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<User | undefined>;
}

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<string>>(
  'AuthStrategy',
);

export const authStrategyProvider = {
  provide: [AUTH_STRATEGY],
  deps: [HttpClient, AUTH_TYPE],
  useFactory: (http: HttpClient, authType: string) => {
    switch (authType) {
      case 'session':
        return new SessionAuthStrategy(http, authType);
      case 'token':
        return new JwtAuthStrategy();
      default:
        throw new Error(`Unknown auth strategy: ${authType}`);
    }
  },
};
