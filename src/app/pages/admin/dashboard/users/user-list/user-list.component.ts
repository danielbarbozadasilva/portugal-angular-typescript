import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../core/http/user.service';
import { IUser, IPaginatedResponse } from '../../../../core/models/models.index';
import { Observable, Subject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users$: Observable<IPaginatedResponse<IUser>> | undefined;
  isLoading = false;
  error: string | null = null;

  // Pagination and search
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchTerm = '';

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.users$ = this.userService.getUsers(this.currentPage, this.pageSize).pipe(
      tap((response) => {
        this.totalItems = response.totalItems;
      }),
      catchError((err) => {
        console.error('Error loading users:', err);
        this.error = err.message || 'Failed to load users.';
        return new Observable<IPaginatedResponse<IUser>>((subscriber) => {
          subscriber.error(err);
        });
      }),
      finalize(() => (this.isLoading = false))
    );
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true;
      this.userService
        .deleteUser(id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => {
            console.log(`User ${id} deleted successfully`);
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            this.error = err.message || 'Failed to delete user.';
          },
        });
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadUsers();
  }
}
