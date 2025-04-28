// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { provideClientHydration } from '@angular/platform-browser';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

export const appServerConfig: ApplicationConfig = mergeApplicationConfig(appConfig, {
  providers: [
    // SSR do Angular
    provideServerRendering(),

    // Rotas especiais do lado do servidor
    provideServerRouting(serverRoutes),

    // Hidratação (marcações no HTML) - caso queira
    provideClientHydration(),
  ],
});
