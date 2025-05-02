// src/app/dashboard/layout/topbar/topbar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor() {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
