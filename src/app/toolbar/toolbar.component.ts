import { Component } from '@angular/core';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [ToolbarService],
})
export class ToolbarComponent {
  constructor(public srv: ToolbarService) {}

  get user$() {
    return this.srv.user$;
  }

  get admin$() {
    return this.srv.admin$;
  }
}
