import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core'; // Importar TranslateModule
import { RouterModule } from '@angular/router'; // Importar RouterModule

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent, // Mover para declarations
  ],
  imports: [
    CommonModule, // Adicionar CommonModule
    RouterModule, // Adicionar RouterModule para routerLink funcionar
    TranslateModule, // Adicionar TranslateModule para o pipe translate
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
