import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonItemComponent } from './skeleton-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SkeletonItemComponent],
  exports: [SkeletonItemComponent],
})
export class SharedUiSkeletonItemModule {}
