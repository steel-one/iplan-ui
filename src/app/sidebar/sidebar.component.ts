import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltip,
} from '@angular/material/tooltip';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    SidebarService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { position: 'right' } },
  ],
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    NgStyle,
    NgIf,
    RouterLinkActive,
    RouterLink,
    MatNavList,
    MatListItem,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatSidenavContent,
    ToolbarComponent,
    RouterOutlet,
    AsyncPipe,
    RouterModule,
  ],
})
export class SidebarComponent {
  constructor(public srv: SidebarService) {}
}
