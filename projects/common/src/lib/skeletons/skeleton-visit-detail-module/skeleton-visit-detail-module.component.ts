import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-visit-detail-module',
  templateUrl: './skeleton-visit-detail-module.component.html',
  styles: [
    '.mat-mdc-table .mat-mdc-row { border-bottom-width: 0; } .mat-mdc-header-row { border-bottom-width: 0; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonVisitDetailModuleComponent {
  displayedColumns: string[] = ['col1'];
  dataSource = new Array(2);
}
