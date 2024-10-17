import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@models/user';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { DialogComponent } from '../users/dialog/dialog.component';

@Injectable()
export class ToolbarService {
  user$ = this.authService.getCurrentUser$().pipe(shareReplay(1));
  isAdmin$ = this.user$.pipe(map((u) => !!u?.roles?.includes('ADMIN')));

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  goToAdminPanel() {
    this.authService.goToAdminPanel();
  }

  logout() {
    this.authService.logout().subscribe();
  }

  updateMe(user: User) {
    const config = {
      width: '400px',
      disableClose: true,
      data: { user },
    };
    return this.dialog.open(DialogComponent, config).afterClosed();
  }
}
