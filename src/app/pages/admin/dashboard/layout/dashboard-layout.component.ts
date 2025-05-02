// src/app/dashboard/layout/dashboard-layout.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {

  // Exemplo de uso de signal para controlar abertura da sidebar
  sidebarOpen = signal<boolean>(true);

  constructor() {}

  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }
}
