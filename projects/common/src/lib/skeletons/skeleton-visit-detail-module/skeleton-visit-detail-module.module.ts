import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonVisitDetailModuleComponent } from './skeleton-visit-detail-module.component';

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonVisitDetailModuleComponent],
  exports: [SkeletonVisitDetailModuleComponent],
})
export class SharedUiSkeletonVisitDetailModuleModule {}
