import { Component } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuContent, MatMenuItem } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [ToolbarService],
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
