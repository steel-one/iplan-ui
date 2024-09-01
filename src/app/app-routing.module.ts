import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/guards/admin.guard';
import { AppGuard } from './auth/guards/app.guard';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';

const ROUTES: Routes = [
  {
    path: 'app',
    canActivate: [AppGuard],
    component: SidebarComponent,
    children: [
      // {
      //   path: 'planing',
      //   loadChildren: () =>
      //     import('./planing/planing.module').then((m) => m.PlaningModule),
      // },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: UsersComponent,
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
