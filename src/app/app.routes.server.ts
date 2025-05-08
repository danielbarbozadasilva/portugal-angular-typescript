import { ServerRoute, RenderMode } from '@angular/ssr'

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
    status: 404
  }
]
