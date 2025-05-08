import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {

  // Exemplo de uso de signal para indicar se a sidebar está aberta
  sidebarOpen = signal<boolean>(true);

  // Exemplo de nome do usuário
  private _userName = 'John Doe';
  userName = signal<string>(this._userName);

  // Exemplo de loading signal
  loading = signal<boolean>(false);

  constructor() {}

  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  isSidebarOpen(): boolean {
    return this.sidebarOpen();
  }

  logout(): void {
    // Lógica de logout. Pode chamar um AuthService, limpar tokens, etc.
    alert('Logout acionado!');
  }
}
