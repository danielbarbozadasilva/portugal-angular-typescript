import { Routes } from '@angular/router'
import { AuthGuard } from '../../core/authentication/auth.guard'

export const solicitationCartRoutes: Routes = [
  {
    path: 'solicitation-cart',
    canActivate: [AuthGuard],
    loadComponent: () => import('./cart.component').then(m => m.SolicitationCartComponent)
  }
]
