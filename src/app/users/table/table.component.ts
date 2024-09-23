import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableItem } from './table-item.model';

@Component({
  selector: 'frontend-section-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
