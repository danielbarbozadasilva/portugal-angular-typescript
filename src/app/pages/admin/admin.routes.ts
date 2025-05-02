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
        component: DashboardHomeComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      // Exemplo de rota para 'agents'
      // {
      //   path: 'agents',
      //   component: AgentsComponent
      // },
      // E assim por diante...
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
