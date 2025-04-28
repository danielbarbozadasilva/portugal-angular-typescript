// src/app/app.routes.server.ts
import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',  // Rota raiz
    renderMode: RenderMode.Prerender,  // Sinaliza que esta rota pode ser pré-renderizada (SSG) durante o build
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server,     // Esta rota será renderizada sob demanda no servidor (SSR a cada request)
  },
  // Podemos repetir para outras rotas se quisermos explicitar modos. 
  // Rota sem especificação explícita tipicamente será SSR por padrão, exceto se detectada como SSG pelo builder.

  // Exemplo de rota de API ou rotas que desejamos apenas CSR (não SSR):
  // { path: 'relatorio', renderMode: RenderMode.Client }, // renderizada apenas no cliente (SSR ignora)

  // Redirecionamento ou tratamento especial (exemplo):
  // { path: 'legacy', renderMode: RenderMode.Server, status: 301, redirectTo: 'novopath' },

  {
    path: '**',  // Wildcard no servidor - lida com rotas não encontradas
    renderMode: RenderMode.Server,   // Renderiza via SSR mesmo caminho desconhecido para retornar página 404
    status: 404,                     // Define status HTTP 404 Not Found para essa rota
    // Poderíamos também definir cabeçalhos específicos, se necessário, por exemplo:
    // headers: { 'Cache-Control': 'no-cache' },
  },
];
