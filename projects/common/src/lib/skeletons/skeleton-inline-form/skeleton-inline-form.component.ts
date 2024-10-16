import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonItemComponent } from '../skeleton-item/skeleton-item.component';

@Component({
    selector: 'skeleton-inline-form',
    templateUrl: './skeleton-inline-form.component.html',
    styleUrls: ['./skeleton-inline-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SkeletonItemComponent],
})
export class SkeletonInlineFormComponent {}
