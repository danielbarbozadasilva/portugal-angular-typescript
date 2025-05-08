// src/app/dashboard/layout/sidebar/sidebar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @Input() isOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor() {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
