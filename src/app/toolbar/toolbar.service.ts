import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@models/user';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { DialogComponent } from '../users/dialog';

@Injectable()
export class ToolbarService {
  user$ = this.authService
    .getCurrentUser$()
    .pipe(map(_userManipulation), shareReplay(1));
  admin$ = this.user$.pipe(
    map((u) => (u?.roles?.includes('ADMIN') ? '(ADMIN)' : '')),
  );

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  logout() {
    this.authService.logout().subscribe();
  }

  updateMe() {
    const config = {
      width: '400px',
      disableClose: true,
    };
    return this.dialog.open(DialogComponent, config).afterClosed();
  }
}

export function _userManipulation(user: User | undefined) {
  if (user) {
    if (user.firstName) {
      const name = [user.firstName, user.lastName]
        .filter((item) => !!item)
        .join(' ');
      return { name, roles: user.roles };
    }
    const email = user.email;
    return { email, roles: user.roles };
  }
  return;
}
