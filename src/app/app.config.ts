// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

// Importa as rotas "client-side"
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Roteamento padrão
    provideRouter(routes),

    // HTTP client
    provideHttpClient(),

    /**
     * A chamada abaixo habilita a hidratação do lado do cliente,
     * caso exista conteúdo SSR vindo do servidor.
     */
    provideClientHydration(),
  ],
};
