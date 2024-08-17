import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-chat-right',
  templateUrl: './skeleton-chat-right.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
      div {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonChatRightComponent {}
