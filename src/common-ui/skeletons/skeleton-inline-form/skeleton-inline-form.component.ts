import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-inline-form',
  templateUrl: './skeleton-inline-form.component.html',
  styleUrls: ['./skeleton-inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonInlineFormComponent {}
