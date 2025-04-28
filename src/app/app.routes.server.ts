// src/app/app.routes.server.ts
import { ServerRoute, RenderMode } from '@angular/ssr';

/**
 * Rotas específicas para o lado do servidor,
 * definindo como o Angular vai pré-renderizar cada rota.
 */
export const serverRoutes: ServerRoute[] = [
  // Rota raiz
  { path: '', renderMode: RenderMode.Server },

  // Rotas sob /home
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'home/portal', renderMode: RenderMode.Server },
  { path: 'home/sign-in', renderMode: RenderMode.Server },
  { path: 'home/signup-client', renderMode: RenderMode.Server },
  { path: 'home/signup-agent', renderMode: RenderMode.Server },
  { path: 'home/agent/edit/:id', renderMode: RenderMode.Server },

  // Rota admin
  { path: 'admin/dashboard', renderMode: RenderMode.Server },

  // Curinga wildcard
  { path: '**', renderMode: RenderMode.Server },
];
