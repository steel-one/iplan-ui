import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-modal',
  templateUrl: './skeleton-modal.component.html',
  styles: ['.mat-mdc-table .mat-mdc-row:last-child { border-bottom-width: 0; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
