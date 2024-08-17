import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-report-card',
  templateUrl: './skeleton-report-card.component.html',
  styles: [
    '.mat-table .mat-row { border-bottom-width: 0; } .mat-header-row { border-bottom-width: 0; }',
    '.fixIE11verticallyCentered { min-height: auto; }',
    '.mat-header-row, .mat-row { min-height: 28px; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonReportCardComponent {
  displayedColumns: string[] = ['col1'];
  dataSource = new Array(1);
}
