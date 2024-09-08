import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { SessionAuthStrategy } from './session-auth.strategy';

export interface AuthStrategy<T> {
  doLoginUser(data: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<User | undefined>;
}

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>(
  'AuthStrategy',
);

export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: (http: HttpClient) => {
    switch (config.AUTH_TYPE) {
      case 'session':
        return new SessionAuthStrategy(http);
      case 'token':
        return new JwtAuthStrategy();
    }
  },
};
