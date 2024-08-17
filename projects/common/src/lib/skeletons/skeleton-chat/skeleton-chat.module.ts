import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiSkeletonItemModule } from '../skeleton-item/skeleton-item.module';
import { SkeletonChatLeftComponent } from './skeleton-chat-left.component';
import { SkeletonChatRightComponent } from './skeleton-chat-right.component';

@NgModule({
  imports: [CommonModule, SharedUiSkeletonItemModule],
  declarations: [SkeletonChatLeftComponent, SkeletonChatRightComponent],
  exports: [SkeletonChatLeftComponent, SkeletonChatRightComponent],
})
export class SharedUiSkeletonChatModule {}
