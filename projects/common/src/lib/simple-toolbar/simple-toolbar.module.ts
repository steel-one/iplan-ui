import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SimpleToolbarNewComponent } from './simple-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  declarations: [SimpleToolbarNewComponent],
  exports: [SimpleToolbarNewComponent],
})
export class SharedUiSimpleToolbarModule {}
