import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-6xl font-bold text-yellow-600 mb-4">403</h1>
      <p class="text-xl mb-6">Acesso negado</p>
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
export class ForbiddenComponent {}
