import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasAccess, initAuth, logOutFn } from './auth';
import { SidebarComponent } from './sidebar/sidebar.component';

const ROUTES: Routes = [
  {
    path: '',
    canActivate: [initAuth],
    children: [
      {
        path: 'auth/logout',
        canActivate: [logOutFn],
        children: [],
      },
      {
        path: '',
        canActivate: [hasAccess],
        data: { requiredScopes: ['access:prt'] },
        component: SidebarComponent,
        children: [],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
