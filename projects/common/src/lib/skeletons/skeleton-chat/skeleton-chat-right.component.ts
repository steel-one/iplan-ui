import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonItemComponent } from '../skeleton-item/skeleton-item.component';

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
    standalone: true,
    imports: [SkeletonItemComponent],
})
export class SkeletonChatRightComponent {}
