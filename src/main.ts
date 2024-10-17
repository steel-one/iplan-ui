import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app/app-routing.module';
import { AppUpdaterService } from './app/app-updater.service';
import { AppComponent } from './app/app.component';
import { AppService } from './app/app.service';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { AuthModule } from './app/auth/auth.module';
import { authStrategyProvider } from './app/auth/services/auth.strategy';
import { HttpErrorHandler } from './app/error.handler';
import { httpErrorInterceptor } from './app/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerImmediately',
      }),
      AuthModule,
      AppRoutingModule,
    ),
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
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
