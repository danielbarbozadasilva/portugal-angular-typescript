import { Routes } from '@angular/router';

export const ACTIVITY_ROUTES: Routes = [
  {
    path: '', // Rota /admin/activities -> Lista de atividades
    loadComponent: () => import('./activity-list/activity-list.component').then((m) => m.ActivitiesListComponent),
    title: 'Admin - Activity List',
  },
  {
    path: 'new', // Rota /admin/activities/new -> Formulário de criação
    loadComponent: () => import('./activity-form/activity-form.component').then((m) => m.ActivityFormComponent),
    title: 'Admin - New Activity',
  },
  {
    path: 'edit/:id', // Rota /admin/activities/edit/{activityId} -> Formulário de edição
    loadComponent: () => import('./activity-form/activity-form.component').then((m) => m.ActivityFormComponent),
    title: 'Admin - Edit Activity',
  },
];
