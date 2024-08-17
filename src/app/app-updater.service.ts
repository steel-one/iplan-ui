import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable, of, switchMap, timer } from 'rxjs';

@Injectable()
export class AppUpdaterService {
  constructor(private updater: SwUpdate) {
    this.updater.versionUpdates.subscribe((e) => {
      switch (e.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${e.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${e.currentVersion.hash}`);
          console.log(`New app version ready for use: ${e.latestVersion.hash}`);
          console.log(
            'Automatically activating new version.',
            JSON.stringify(e)
          );
          this.updater.activateUpdate().then(() => document.location.reload());
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${e.version.hash}': ${e.error}`
          );
          break;
      }
    });

    this.updater.unrecoverable.subscribe((event) => {
      document.location.reload();
      throw new Error(
        `An error occurred that we cannot recover from: ${event.reason}`
      );
    });
  }

  /**
   * Emits the result of the check for updates.
   */
  checkForUpdate(): Observable<boolean> {
    return timer(0, 60 * 1000).pipe(
      switchMap(() => {
        if (!this.updater.isEnabled) {
          console.warn('ServiceWorker (thus auto-update) is disabled.');
          return of(false);
        }
        return this.updater.checkForUpdate();
      })
    );
  }
}
