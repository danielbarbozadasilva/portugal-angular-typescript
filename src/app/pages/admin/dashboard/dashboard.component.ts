// dashboard.component.ts

import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/store/reducers-map';
import { loadUsers } from '@app/core/store/user/user.actions';
import { loadActivities } from '@app/core/store/activity/activity.actions';
import { loadOrders } from '@app/core/store/order/order.actions';
import {
  selectAllUsers,
  selectUserError,
  selectUserLoading,
} from '@app/core/store/user/user.selectors';
import { selectAllActivities } from '@app/core/store/activity/activity.selectors';
import { selectAllOrders } from '@app/core/store/order/order.selectors';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/module.d-DBDMCw5I';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/module.d-vndDeG-q';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    DashboardLayoutComponent,
    MatSortModule,
    SidebarComponent,
    TopbarComponent,
    DashboardHomeComponent,
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = signal(true);
  userName = signal('Admin');

  userCount: WritableSignal<number> = signal(0);
  recentActivities: WritableSignal<any[]> = signal([]);
  salesSummary: WritableSignal<{ total: number; count: number }> = signal({ total: 0, count: 0 });
  loading = signal(false);

  users$!: Observable<any[]>;
  activities$!: Observable<any[]>;
  orders$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(
    public translate: TranslateService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.activities$ = this.store.select(selectAllActivities);
    this.orders$ = this.store.select(selectAllOrders);
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadActivities({}));
    this.store.dispatch(loadOrders());

    effect(() => {
      this.users$.subscribe((users: any[]) => {
        this.userCount.set(users.length);
      });

      this.activities$.subscribe((acts: any[]) => {
        this.recentActivities.set(acts.slice(0, 5));
      });

      this.orders$.subscribe((orders: any[]) => {
        const total = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
        this.salesSummary.set({ total, count: orders.length });
      });
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  // Exemplo de métodos de navegação
  navigateToUsers(): void {
    // this.router.navigate(['/admin/users']);
  }
  navigateToActivities(): void {
    // this.router.navigate(['/admin/activities']);
  }
  navigateToOrders(): void {
    // this.router.navigate(['/admin/orders']);
  }

  logout(): void {
    // Implementar a lógica de logout
  }

  // Métodos para editar/deletar usuário
  editUser(userId: string): void {
    console.log(userId);
    // Lógica de edição
  }
  deleteUser(userId: string): void {
    console.log(userId);
    // Lógica de exclusão
  }
}
