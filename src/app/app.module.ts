import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppUpdaterService } from './app-updater.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LoaderModule } from './loader/loader.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
    SidebarModule,
    HttpClientModule,
  ],
  providers: [AppService, AppUpdaterService, AppConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
