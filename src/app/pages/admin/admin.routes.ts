import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { AdminLayoutComponent } from './dashboard/layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardHomeComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      // Rota para 'agents' (Lazy Loading)
      {
        path: 'agents',
        loadChildren: () => import('./dashboard/agents/agents.routes').then((m) => m.AGENT_ROUTES),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'consultant',
        loadChildren: () => import('./dashboard/consultants/consultants.routes').then((m) => m.CONSULTANT_ROUTES),
      },
      {
        path: 'consultant/form',
        component: ConsultantFormComponent,
      },
      {
        path: 'consultant',
        component: ConsultantListComponent ,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
