import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OAuthService {
  isStateValid(state: string | null): boolean {
    throw new Error('Method not implemented.');
  }
  isNonceValid(user: {}): boolean {
    throw new Error('Method not implemented.');
  }
  requestIdToken() {}

  decodeIdToken(token: string) {
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return JSON.parse(payload);
    }
  }
}
