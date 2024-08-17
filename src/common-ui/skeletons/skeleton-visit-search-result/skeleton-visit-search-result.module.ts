import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonVisitSearchResultComponent } from './skeleton-visit-search-result.component';

@NgModule({
  imports: [CommonModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonVisitSearchResultComponent],
  exports: [SkeletonVisitSearchResultComponent],
})
export class SharedUiSkeletonVisitSearchResultModule {}
