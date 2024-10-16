import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';


import { AppRoutingModule } from './app-routing.module';
import { AppUpdaterService } from './app-updater.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { authStrategyProvider } from './auth/services/auth.strategy';
import { HttpErrorHandler } from './error.handler';
import { httpErrorInterceptor } from './error.interceptor';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerImmediately',
    }),
    SidebarModule,
    AuthModule,
    AppRoutingModule,
],
  providers: [
    AppUpdaterService,
    HttpErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    authStrategyProvider,
    AppService,
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
