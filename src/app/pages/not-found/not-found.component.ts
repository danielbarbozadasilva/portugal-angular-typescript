import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p class="text-xl mb-6">Página não encontrada</p>
      <a routerLink="/" class="text-primary underline">Voltar para o início</a>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NotFoundComponent {}
