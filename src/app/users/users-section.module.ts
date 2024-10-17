import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { SectionComponent } from './section/section.component';

const ROUTES = [{ path: '', component: SectionComponent }];

@NgModule({
  imports: [
    CommonModule,
    SectionComponent,
    DialogComponent,
    RouterModule.forChild(ROUTES),
  ],
})
export class UsersSectionModule {}
