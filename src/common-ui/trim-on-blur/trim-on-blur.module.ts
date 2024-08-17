import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrimOnBlurDirective } from './trim-on-blur.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TrimOnBlurDirective],
  providers: [TrimOnBlurDirective],
  exports: [TrimOnBlurDirective],
})
export class TrimOnBlurModule {}
