import { Component, Input } from '@angular/core';
import { Breadcrumb, Tab } from './simple-toolbar.models';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { NgIf, NgFor, NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabNav, MatTabLink } from '@angular/material/tabs';

@Component({
    selector: 'frontend-simple-toolbar',
    templateUrl: './simple-toolbar.component.html',
    styleUrls: ['./simple-toolbar.component.scss'],
    standalone: true,
    imports: [
        MatToolbar,
        NgIf,
        MatToolbarRow,
        NgFor,
        MatIcon,
        RouterLink,
        NgTemplateOutlet,
        MatTabNav,
        MatTabLink,
        RouterLinkActive,
    ],
})
export class SimpleToolbarNewComponent {
  @Input() breadcrumbs: Breadcrumb[] | null = null;
  @Input() tabs: Tab[] | null = null;
  @Input() title: string | null = null;
}
