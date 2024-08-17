import { Injectable } from '@angular/core';
import { combineLatest, first, map, startWith } from 'rxjs';
import { AppUpdaterService } from './app-updater.service';

@Injectable()
export class AppService {
  _isLoadingAnUpdate$ = this.updaterSrv.checkForUpdate().pipe(first());

  isLoading$ = combineLatest([this._isLoadingAnUpdate$]).pipe(
    map((all) => all.some((result) => !!result)),
    startWith(true)
  );

  constructor(private updaterSrv: AppUpdaterService) {}
}
