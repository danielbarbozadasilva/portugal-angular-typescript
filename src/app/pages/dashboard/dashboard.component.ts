import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName: string = 'Usuário Exemplo';
  isSidebarOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    console.log('Dashboard inicializado');
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
