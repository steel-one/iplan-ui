import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchBoxComponent } from './search-box.component';
import { TrimDirective } from '../component-tools/trim-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TrimDirective,
    SearchBoxComponent,
  ],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
