// src/app/app.config.server.ts
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRouting } from '@angular/ssr';  // OK
import { serverRoutes } from './app.routes.server';

import { appConfig } from './app.config';

// Configuração adicional para SSR (servidor)
const serverAppConfig: ApplicationConfig = {
  providers: [
    provideServerRouting(serverRoutes),
  ],
};

export const serverConfig: ApplicationConfig = mergeApplicationConfig(appConfig, serverAppConfig);
