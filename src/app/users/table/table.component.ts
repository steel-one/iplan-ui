import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, SortDirection, MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TableItem } from './table-item.model';
import { NgStyle, NgIf } from '@angular/common';
import { MatIconButton, MatIconAnchor } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'frontend-section-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgStyle,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        MatCellDef,
        MatCell,
        MatIconButton,
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        MatMenuItem,
        MatIconAnchor,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
        NgIf,
    ],
})
export class TableComponent {
  columnSet = [
    'email',
    'firstName',
    'lastName',
    'isBlocked',
    'isConfirmed',
    'roles',
    'actions',
  ];

  dataSource = new MatTableDataSource<TableItem>();

  @Input() paginatorPageSize!: number;
  @Input() paginatorPageIndex!: number;
  @Input() sortActive!: string;
  @Input() sortDirection!: SortDirection;
  @Input() collectionLength!: number | null;
  @Input() set pageItems(pageItems: TableItem[] | null) {
    if (pageItems) {
      this.dataSource.data = pageItems;
    }
  }

  @Output() page = new EventEmitter<PageEvent>();
  @Output() sort = new EventEmitter<Sort>();
  @Output() update = new EventEmitter<TableItem>();
  @Output() block = new EventEmitter<TableItem>();

  trackByFn(index: number, item: TableItem) {
    return item.id;
  }
}
