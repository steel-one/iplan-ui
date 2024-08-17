import { APP_INITIALIZER } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { setupUpdater } from './updater';

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: appInitializer,
  deps: [SwUpdate],
  multi: true,
};

function appInitializer(updates: SwUpdate) {
  setupUpdater(updates);
  return () => {};
}
