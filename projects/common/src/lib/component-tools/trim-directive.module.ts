import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrimDirective } from './trim-directive';

@NgModule({
    imports: [CommonModule, TrimDirective],
    providers: [TrimDirective],
    exports: [TrimDirective],
})
export class TrimDirectiveModule {}
