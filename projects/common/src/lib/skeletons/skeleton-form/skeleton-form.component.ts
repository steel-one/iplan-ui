import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-form',
  templateUrl: './skeleton-form.component.html',
  styles: [
    '.mat-mdc-table .mat-mdc-row { border-bottom-width: 0; } .mat-mdc-header-row { border-bottom-width: 0; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFormComponent {
  displayedColumns: string[] = ['col1'];
  dataSource = new Array(3);
}
