import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { IUser } from '../models';
import { Observable } from 'rxjs';
import { AuthSelectors } from '@app/core/store/auth/auth.selectors';
import { logout } from '@app/core/store/auth/auth.actions';

@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {

  private isSidebarOpen = signal(false);

  constructor(
    private store: Store,
    private authSelectors: AuthSelectors
  ) {}
  currentUser$: Observable<IUser | null> = this.store.select(this.authSelectors.selectCurrentUser);

  toggleSidebar(): void {
    this.isSidebarOpen.update((open) => !open);
  }

  // Exemplo: método para logout, disparando ação do NgRx:
  logout(): void {
    this.store.dispatch(this.authSelectors.logout());
  }
}
