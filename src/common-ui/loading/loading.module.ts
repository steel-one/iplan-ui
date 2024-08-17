import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatProgressSpinnerModule],
  exports: [LoadingComponent],
})
export class LoadingModule {}
