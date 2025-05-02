import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/authentication/auth.guard';
import { RoleGuard } from '../../core/authentication/role.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Admin Dashboard',
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.routes').then((m) => m.USERS_ROUTES),
        title: 'Manage Users',
      },
      {
        path: 'agents',
        loadChildren: () => import('./agents/agents.routes').then((m) => m.AGENT_ROUTES),
        title: 'Manage Agents',
      },
      {
        path: 'consultants',
        loadChildren: () => import('./consultants/consultant-list/consultant-list.component').then(m => m.ConsultantListComponent),
        title: 'Manage Consultants'
      },
      {
        path: 'activities',
        loadChildren: () => import('./activities/activities.routes').then((m) => m.ACTIVITY_ROUTES),
        title: 'Manage Activities',
      },
      {
        path: '', 
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
