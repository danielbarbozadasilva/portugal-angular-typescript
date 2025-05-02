// src/app/dashboard/dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { ActivitiesListComponent } from './pages/activities/activities-list/activities-list.component';
import { ActivityFormComponent } from './pages/activities/activity-form/activity-form.component';
import { ActivityDetailsComponent } from './pages/activities/activity-details/activity-details.component';

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

      // Rotas do CRUD de Activities
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
        component: ActivityDetailsComponent
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
