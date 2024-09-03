import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoaderModule } from 'src/common-ui/loader';
import {
  AppConfigService,
  AUTH_TYPE,
  AUTH_URL,
  BFF_GRAPHQL_URL,
} from './app-config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppUpdaterService } from './app-updater.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpErrorHandler } from './error.handler';
import { httpErrorInterceptor } from './error.interceptor';
import { SidebarModule } from './sidebar/sidebar.module';
import { UsersModule } from './users/users.module';

export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.loadConfig();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
    LoaderModule,
    SidebarModule,
    AuthModule,
    AppRoutingModule,
    UsersModule,
  ],
  providers: [
    AppService,
    AppUpdaterService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: AUTH_URL,
      useFactory: (appConfigSrv: AppConfigService) =>
        appConfigSrv.get('AUTH_URL'),
      deps: [AppConfigService],
    },
    {
      provide: AUTH_TYPE,
      useFactory: (appConfigSrv: AppConfigService) =>
        appConfigSrv.get('AUTH_TYPE'),
      deps: [AppConfigService],
    },
    {
      provide: BFF_GRAPHQL_URL,
      useFactory: (appConfigSrv: AppConfigService) =>
        appConfigSrv.get('BFF_GRAPHQL_URL'),
      deps: [AppConfigService],
    },
    HttpErrorHandler,
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
