import { Injectable } from '@angular/core';
import { combineLatest, first, map, startWith } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { AppUpdaterService } from './app-updater.service';

@Injectable()
export class AppService {
  _isLoadingAnUpdate$ = this.updaterSrv.checkForUpdate().pipe(first());

  isLoading$ = combineLatest([this._isLoadingAnUpdate$, this.configSrv.isLoading$]).pipe(
    map((all) => all.some((result: boolean) => !!result)),
    startWith(true)
  );

  constructor(
    private updaterSrv: AppUpdaterService,
    private configSrv: AppConfigService
  ) {}
}