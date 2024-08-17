import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-report-card',
  templateUrl: './skeleton-report-card.component.html',
  styles: [
    '.mat-mdc-table .mat-mdc-row { border-bottom-width: 0; } .mat-mdc-header-row { border-bottom-width: 0; }',
    '.mat-mdc-header-row, .mat-mdc-row { min-height: 28px; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonReportCardComponent {
  displayedColumns: string[] = ['col1'];
  dataSource = new Array(1);
}
