import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonModalComponent } from './skeleton-modal.component';

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonModalComponent],
  exports: [SkeletonModalComponent],
})
export class SharedUiSkeletonModalModule {}
