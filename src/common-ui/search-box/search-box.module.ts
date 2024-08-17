import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TrimOnBlurModule } from '../trim-on-blur';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatLegacyButtonModule,
    MatIconModule,
    TrimOnBlurModule,
  ],
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
