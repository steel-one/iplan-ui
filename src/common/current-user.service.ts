import { Injectable } from '@angular/core';

import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { User, UserPreferences } from './user';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  _user$: ReplaySubject<User> = new ReplaySubject(1);
  isReady$ = this.preferences$.pipe(map((data) => !!data));

  get user$() {
    return this._user$.pipe(catchError(() => EMPTY));
  }

  get preferences$(): Observable<UserPreferences> {
    return this.user$.pipe(map((data) => data?.preferences ?? {}));
  }

  savePreferences(preferences: UserPreferences) {
    return this.user$.pipe(filter(({ id }) => !!id));
  }
}
