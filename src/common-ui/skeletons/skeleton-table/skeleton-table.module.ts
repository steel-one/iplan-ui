import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonTableComponent } from './skeleton-table.component';

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonTableComponent],
  exports: [SkeletonTableComponent],
})
export class SharedUiSkeletonTableModule {}
