// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  // Rota principal em /home/portal
  {
    path: 'home/portal',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  // Sign in em /home/sign-in
  {
    path: 'home/sign-in',
    loadComponent: () =>
      import('./pages/signIn/signin.component').then(m => m.SignInComponent),
  },
  // Signup client em /home/signup-client
  {
    path: 'home/signup-client',
    loadComponent: () =>
      import('./pages/signup-client/signup-client-component').then(m => m.SignUpClientComponent),
  },
  // Signup agent em /home/signup-agent
  {
    path: 'home/signup-agent',
    loadComponent: () =>
      import('./pages/signup-agent/signup-agent-component').then(m => m.SignupAgentComponent),
  },
  // Portal root em /home
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  // Exemplo de rota admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  // Rota raiz, redirecionando para /home
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  // Rotas desconhecidas => wildcard
  // {
  //   path: '**',
  //   // Um fallback -> "página não encontrada" ou "sign-in"
  //   loadComponent: () =>
  //     import('./pages/notfound/notfound.component').then(m => m.NotFoundComponent),
  // },
];
