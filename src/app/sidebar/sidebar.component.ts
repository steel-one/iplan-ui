import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [SidebarService],
})
export class SidebarComponent {
  constructor(public srv: SidebarService) {}
}
