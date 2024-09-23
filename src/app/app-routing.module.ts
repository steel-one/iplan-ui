import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/guards/admin.guard';
import { AppGuard } from './auth/guards/app.guard';
import { SidebarComponent } from './sidebar/sidebar.component';

const ROUTES: Routes = [
  {
    path: 'app',
    canActivate: [AppGuard],
    component: SidebarComponent,
    children: [
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./users/users-section.module').then(
            (m) => m.UsersSectionModule,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
