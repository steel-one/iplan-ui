import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
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
