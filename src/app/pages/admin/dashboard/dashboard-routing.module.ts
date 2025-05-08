// src/app/dashboard/dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ActivitiesListComponent } from './activities/activity-list/activity-list.component';
import { ActivityFormComponent } from './activities/activity-form/activity-form.component';
import { ActivityDetailComponent } from './activities/activity-detail/activity-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: DashboardHomeComponent
      },
      {
        path: 'activities',
        component: ActivitiesListComponent
      },
      {
        path: 'activities/new',
        component: ActivityFormComponent
      },
      {
        path: 'activities/:id/edit',
        component: ActivityFormComponent
      },
      {
        path: 'activities/:id',
        component: ActivityDetailComponent
      }

      // Outras rotas de CRUD (Agents, Orders, etc.) serão adicionadas depois
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
