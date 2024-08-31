import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ILoginRequest } from '@models/loginRequest';
import { Role } from '@models/types';
import { User } from '@models/user';
import { config } from './../../config';
import { AUTH_STRATEGY, AuthStrategy } from './auth.strategy';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly INITIAL_PATH = '/app';
  public readonly ADMIN_PATH = '/admin';
  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>,
  ) {}

  getInitialPathForRole(roles: Role[]): string {
    return roles.includes('ADMIN') ? this.ADMIN_PATH : this.INITIAL_PATH;
  }

  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config['authUrl']}/sign_up`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.post<any>(`${config['authUrl']}/confirm?`, {
      email,
      code,
    });
  }

  login(loginRequest: ILoginRequest): Observable<User> {
    return this.http
      .post<any>(`${config['authUrl']}/login`, loginRequest)
      .pipe(tap((data) => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.get<any>(`${config['authUrl']}/logout`).pipe(
      tap((data) => {
        this.doLogoutAndRedirectToLogin();
      }),
      catchError((e) => {
        console.error(e);
        return e;
      }),
    );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false)),
    );
  }

  getCurrentUser$(): Observable<User | undefined> {
    return this.auth.getCurrentUser();
  }

  getUserRoles$(): Observable<string[] | undefined> {
    return this.auth.getCurrentUser().pipe(map((user) => user?.roles));
  }

  getUserEmail$(): Observable<string | undefined> {
    return this.auth.getCurrentUser().pipe(map((user) => user && user.email));
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  private doLogoutUser() {
    this.auth.doLogoutUser();
  }
}
