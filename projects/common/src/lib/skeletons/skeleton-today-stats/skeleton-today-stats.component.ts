import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-today-stats',
  templateUrl: './skeleton-today-stats.component.html',
  styleUrls: ['./skeleton-today-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTodayStatsComponent {
  displayedColumns: string[] = ['col1', 'col2'];
  dataSource = new Array(5);

  getWidth(min = 50, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min) + '%';
  }
}
