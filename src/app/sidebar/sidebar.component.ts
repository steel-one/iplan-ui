import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NgStyle, NgIf, AsyncPipe } from '@angular/common';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [SidebarService],
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
    ],
})
export class SidebarComponent {
  constructor(public srv: SidebarService) {}
}
