import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { NgFor, NgStyle } from '@angular/common';
import { SkeletonItemComponent } from '../skeleton-item/skeleton-item.component';

@Component({
    selector: 'skeleton-table',
    templateUrl: './skeleton-table.component.html',
    styles: ['.mat-mdc-table .mat-mdc-row:last-child { border-bottom-width: 0; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatTable,
        NgFor,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        SkeletonItemComponent,
        NgStyle,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
    ],
})
export class SkeletonTableComponent {
  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4'];
  dataSource = new Array(10);

  getWidth() {
    const min = 20;
    const max = 80;
    return Math.floor(Math.random() * (max - min + 1) + min) + '%';
  }
}
