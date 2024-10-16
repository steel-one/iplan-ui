import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { TrimDirective } from '../component-tools/trim-directive';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        TrimDirective,
        MatInput,
        ReactiveFormsModule,
        MatIconButton,
        MatSuffix,
        MatIcon,
    ],
})
export class SearchBoxComponent implements OnInit {
  @Output() searchChanges = new EventEmitter<string>();
  @Input() placeholder = 'Search...';

  searchCtrl = new FormControl(null);

  ngOnInit() {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((val) => this.searchChanges.emit(val || ''));
  }

  onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.clear();
      event.stopPropagation();
    }
  }

  clear() {
    this.searchCtrl.setValue(null);
  }
}
