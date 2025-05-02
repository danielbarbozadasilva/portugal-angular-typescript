import { Routes } from '@angular/router';

// Importe o componente de listagem
import { UserListComponent } from './user-list/user-list.component';
// import { UserFormComponent } from './user-form/user-form.component'; // Descomente se/quando criar

export const USERS_ROUTES: Routes = [
  {
    path: '', // Rota padrão para /admin/users
    component: UserListComponent, // Carrega diretamente o componente
    title: 'Admin | Gerenciar Usuários',
  },
  // {
  //   path: 'new',
  //   component: UserFormComponent,
  //   title: 'Admin | Novo Usuário'
  // },
  // {
  //   path: 'edit/:id',
  //   component: UserFormComponent,
  //   title: 'Admin | Editar Usuário'
  // }
];
