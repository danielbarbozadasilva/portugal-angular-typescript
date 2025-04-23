import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Otimização de detecção de mudanças
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Roteamento
    provideRouter(routes),
    // SSR + hydration no client
    provideClientHydration(withEventReplay()),
  ],
};
