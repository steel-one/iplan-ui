import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { SkeletonItemComponent } from '../skeleton-item/skeleton-item.component';

@Component({
    selector: 'skeleton-form',
    templateUrl: './skeleton-form.component.html',
    styles: [
        '.mat-mdc-table .mat-mdc-row { border-bottom-width: 0; } .mat-mdc-header-row { border-bottom-width: 0; }',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatTable,
        NgFor,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        SkeletonItemComponent,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
    ],
})
export class SkeletonFormComponent {
  displayedColumns: string[] = ['col1'];
  dataSource = new Array(3);
}
