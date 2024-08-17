import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-chat-left',
  templateUrl: './skeleton-chat-left.component.html',
  styles: [
    `
          :host {
            width: 280px;
          }
          div {
            display: flex;
          }
        `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonChatLeftComponent {}
