import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from '@models/token';
import { config } from './../../config';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  setup(email: string, code: string, password: string): Observable<Token> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${config['AUTH_URL']}/setup`, {
      email,
      code,
      password,
    });
  }

  requestRecovery(email: string) {
    return this.http.post<any>(`${config['AUTH_URL']}/request-recovery`, {
      email,
    });
  }

  recover(email: string, code: string, password: string): Observable<Token> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${config['AUTH_URL']}/recover`, {
      email,
      code,
      password,
    });
  }
}
