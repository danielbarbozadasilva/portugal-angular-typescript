// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'admin', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  // ...
  { path: '**', redirectTo: 'home' },
];
