import { HttpClient } from '@angular/common/http';
import { User } from '@models/user';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../../config';
import { AuthStrategy } from './auth.strategy';

export class SessionAuthStrategy implements AuthStrategy<User> {
  private loggedUser: User | undefined = new User();

  constructor(private http: HttpClient) {}

  doLoginUser(user: User): void {
    this.loggedUser = user;
  }

  doLogoutUser(): void {
    this.loggedUser = undefined;
  }

  getCurrentUser(): Observable<User> {
    if (this.loggedUser) {
      return of(this.loggedUser);
    } else {
      return this.http
        .get<User>(`${config['AUTH_URL']}/users/me`)
        .pipe(tap((user) => (this.loggedUser = user)));
    }
  }
}
