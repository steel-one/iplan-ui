import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonReportCardComponent } from './skeleton-report-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    SharedUiSkeletonItemModule,
  ],
  declarations: [SkeletonReportCardComponent],
  exports: [SkeletonReportCardComponent],
})
export class SharedUiSkeletonReportCardModule {}
