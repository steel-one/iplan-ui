import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonInlineFormComponent } from './skeleton-inline-form.component';

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonInlineFormComponent],
  exports: [SkeletonInlineFormComponent],
})
export class SharedUiSkeletonInlineFormModule {}