import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class ToolbarService {
  user$ = this.authService
    .getCurrentUser$()
    .pipe(map(_userManipulation), shareReplay(1));
  admin$ = this.user$.pipe(
    map((u) => (u?.roles?.includes('ADMIN') ? '(ADMIN)' : '')),
  );

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe();
  }
}

export function _userManipulation(user: User | undefined) {
  if (user) {
    if (user.first_name) {
      const name = [user.first_name, user.last_name]
        .filter((item) => !!item)
        .join(' ');
      return { name, roles: user.roles };
    }
    const email = user.email;
    return { email, roles: user.roles };
  }
  return;
}
