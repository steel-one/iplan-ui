import { Component, Input } from '@angular/core';
import { Breadcrumb, Tab } from './simple-toolbar.models';

@Component({
  selector: 'frontend-simple-toolbar',
  templateUrl: './simple-toolbar.component.html',
  styleUrls: ['./simple-toolbar.component.scss'],
})
export class SimpleToolbarNewComponent {
  @Input() breadcrumbs: Breadcrumb[] | null = null;
  @Input() tabs: Tab[] | null = null;
  @Input() title: string | null = null;
}
