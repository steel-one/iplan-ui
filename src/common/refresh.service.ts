import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RefreshService {
  private _refresh$: Subject<string> = new Subject();

  get onRefresh$() {
    return this._refresh$.asObservable().pipe(startWith(''));
  }

  public refresh() {
    this._refresh$.next('');
  }
}
