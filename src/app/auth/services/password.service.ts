import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { config } from './../../config';
import { Token } from '@models/token';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  setup(email: string, code: string, password: string): Observable<Token> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${config['authUrl']}/setup`, {
      email,
      code,
      password,
    });
  }

  requestRecovery(email: string) {
    return this.http.post<any>(`${config['authUrl']}/request-recovery`, {
      email,
    });
  }

  recover(email: string, code: string, password: string): Observable<Token> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${config['authUrl']}/recover`, {
      email,
      code,
      password,
    });
  }
}
