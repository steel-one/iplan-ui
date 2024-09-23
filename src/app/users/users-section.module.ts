import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from './dialog/dialog.module';
import { SectionComponent } from './section/section.component';
import { SectionModule } from './section/section.module';
import { TableModule } from './table';

const ROUTES = [{ path: '', component: SectionComponent }];

@NgModule({
  imports: [
    CommonModule,
    SectionModule,
    TableModule,
    DialogModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [],
})
export class UsersSectionModule {}
