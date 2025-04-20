import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', // Rota padrão para /dashboard
    component: DashboardComponent,
    // Adicione rotas filhas aqui se necessário:
    // children: [
    //   { path: 'profile', component: ProfileComponent },
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
