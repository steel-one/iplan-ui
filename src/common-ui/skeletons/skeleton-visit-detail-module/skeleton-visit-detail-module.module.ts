import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonVisitDetailModuleComponent } from './skeleton-visit-detail-module.component';

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonVisitDetailModuleComponent],
  exports: [SkeletonVisitDetailModuleComponent],
})
export class SharedUiSkeletonVisitDetailModuleModule {}
