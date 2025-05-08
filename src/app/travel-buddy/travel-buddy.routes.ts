import { Routes } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth.guard';

export const travelBuddyRoutes: Routes = [
  {
    path: 'partner-search',
    loadComponent: () => import('./partner-search/partner-search.component').then((m) => m.PartnerSearchComponent),
    canActivate: [AuthGuard],
    title: 'Buscar Parceiro',
  },
  {
    path: 'group-management',
    loadComponent: () =>
      import('./group-management/group-management.component').then((m) => m.GroupManagementComponent),
    canActivate: [AuthGuard],
    title: 'Gerenciar Grupo',
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.TravelBuddyChatComponent),
    canActivate: [AuthGuard],
    title: 'Chat de Parceiros',
  },
];
