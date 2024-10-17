import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { RefreshService } from '@common/refresh.service';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [ToolbarService, RefreshService],
  standalone: true,
  imports: [
    MatToolbar,
    NgIf,
    MatButton,
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
    AsyncPipe,
    RouterModule,
  ],
})
export class ToolbarComponent {
  constructor(public srv: ToolbarService) {}

  get user$() {
    return this.srv.user$;
  }

  get isAdmin$() {
    return this.srv.isAdmin$;
  }
}
