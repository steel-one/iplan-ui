import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-visit-detail-module',
  templateUrl: './skeleton-visit-detail-module.component.html',
  styles: [
    '.mat-table .mat-row { border-bottom-width: 0; } .mat-header-row { border-bottom-width: 0; }',
    '.fixIE11verticallyCentered { min-height: auto; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonVisitDetailModuleComponent {
  displayedColumns: string[] = ['col1'];
  dataSource = new Array(2);
}
