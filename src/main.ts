import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppUpdaterService } from './app/app-updater.service';
import { HttpErrorHandler } from './app/error.handler';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { authStrategyProvider } from './app/auth/services/auth.strategy';
import { AppService } from './app/app.service';
import { httpErrorInterceptor } from './app/error.interceptor';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { SidebarModule } from './app/sidebar/sidebar.module';
import { AuthModule } from './app/auth/auth.module';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerImmediately',
        }), SidebarModule, AuthModule, AppRoutingModule),
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
    ]
})
  .catch((err) => console.error(err));
