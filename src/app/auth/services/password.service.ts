import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from '@models/token';
import { AUTH_TYPE } from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(
    private http: HttpClient,
    @Inject(AUTH_TYPE) private authUrl: string,
  ) {}

  setup(email: string, code: string, password: string): Observable<Token> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${this.authUrl}/setup`, {
      email,
      code,
      password,
    });
  }

  requestRecovery(email: string) {
    return this.http.post<any>(`${this.authUrl}/request-recovery`, {
      email,
    });
  }

  recover(email: string, code: string, password: string): Observable<Token> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${this.authUrl}/recover`, {
      email,
      code,
      password,
    });
  }
}
