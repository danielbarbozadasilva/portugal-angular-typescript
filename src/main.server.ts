// src/main.server.ts
import 'zone.js/node';  // Import necessário para zone.js no ambiente Node.
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';  // Função para renderizar a app em uma string (SSR)

import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';

// Função de bootstrap para SSR – inicializa a app com a configuração de servidor (SSR).
export default function bootstrap() {
  return bootstrapApplication(AppComponent, serverConfig);
}

// Exporta a função de renderização para o motor SSR (Angular Universal usará isto para obter HTML).
export { renderApplication };
