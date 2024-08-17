import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonTodayStatsComponent } from './skeleton-today-stats.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    SharedUiSkeletonItemModule,
  ],
  declarations: [SkeletonTodayStatsComponent],
  exports: [SkeletonTodayStatsComponent],
})
export class SharedUiSkeletonTodayStatsModule {}
