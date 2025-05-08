import { Component, OnInit, signal } from '@angular/core';

// Exemplo de interface de usuário
interface User {
  _id: string;
  name: string;
  email: string;
  permissions: string[];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  users = signal<User[]>([]);

  constructor() {}

  ngOnInit(): void {
    // Simulação de carregamento de dados
    setTimeout(() => {
      this.loading.set(false);
      // Exemplo de carga de dados
      this.users.set([
        { _id: '1', name: 'Alice', email: 'alice@example.com', permissions: ['Admin', 'Editor'] },
        { _id: '2', name: 'Bob', email: 'bob@example.com', permissions: ['Viewer'] },
      ]);
    }, 1000);
  }

  editUser(id: string): void {
    // Lógica de edição (navegar para /admin/users/edit/:id, por ex.)
    alert(`Editar usuário de ID: ${id}`);
  }

  deleteUser(id: string): void {
    // Lógica de deleção
    alert(`Excluir usuário de ID: ${id}`);
  }
}
