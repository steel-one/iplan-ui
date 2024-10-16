import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { NgFor, NgStyle } from '@angular/common';
import { SkeletonItemComponent } from '../skeleton-item/skeleton-item.component';

@Component({
    selector: 'skeleton-modal',
    templateUrl: './skeleton-modal.component.html',
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
export class SkeletonModalComponent {
  displayedColumns: string[] = ['col1', 'col2'];
  dataSource = new Array(5);

  getWidth() {
    const min = 20;
    const max = 80;
    return Math.floor(Math.random() * (max - min + 1) + min) + '%';
  }
}
