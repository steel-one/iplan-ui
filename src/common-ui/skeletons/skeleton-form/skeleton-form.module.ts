import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonFormComponent } from './skeleton-form.component';

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonFormComponent],
  exports: [SkeletonFormComponent],
})
export class SharedUiSkeletonFormModule {}
