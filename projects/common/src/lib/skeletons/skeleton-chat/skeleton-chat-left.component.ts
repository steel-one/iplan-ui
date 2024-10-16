import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonItemComponent } from '../skeleton-item/skeleton-item.component';

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
    standalone: true,
    imports: [SkeletonItemComponent],
})
export class SkeletonChatLeftComponent {}
