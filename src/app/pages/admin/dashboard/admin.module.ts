// src/app/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material Módulos (traga o que precisar)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Roteamento
import { DashboardRoutingModule } from './dashboard-routing.module';

// Layout
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

// Páginas

@NgModule({
  declarations: [

  ],
  imports: [
    DashboardLayoutComponent,
    SidebarComponent,
    TopbarComponent,
    DashboardHomeComponent
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: []
})
export class DashboardModule {}
