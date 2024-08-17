import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonReportCardComponent } from './skeleton-report-card.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonReportCardComponent],
  exports: [SkeletonReportCardComponent],
})
export class SharedUiSkeletonReportCardModule {}
