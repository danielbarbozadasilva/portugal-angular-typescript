import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ConsultantService } from '@app/core/http'; // Assumindo que existe ConsultantService
import { IConsultant } from '@app/core/models/models.consultant'; // Assumindo que existe IConsultant
import { IPaginatedResponse } from '@app/core/models/models.user'; // Reutilizando interface de paginação
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './consultant-list.component.html',
  // styleUrls: ['./consultant-list.component.scss'], // Adicionar se houver estilos específicos
})
export class ConsultantListComponent implements OnInit {
  private consultantService = inject(ConsultantService);
  private router = inject(Router);
  translate = inject(TranslateService);

  consultants = signal<IConsultant[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  totalConsultants = signal<number>(0);
  currentPage = signal<number>(1);
  limit = signal<number>(10); // Itens por página

  private searchTerms = new Subject<string>();
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.loadConsultants(this.currentPage(), this.limit());
    this.setupSearch();
  }

  loadConsultants(page: number, limit: number, searchTerm?: string): void {
    this.loading.set(true);
    this.error.set(null);
    const filters = searchTerm ? { keyword: searchTerm } : {}; // Ajustar filtro conforme API

    this.consultantService.getConsultants(page, limit, filters).subscribe({
      next: (response: IPaginatedResponse<IConsultant>) => {
        this.consultants.set(response.data);
        this.totalConsultants.set(response.total || 0);
        this.currentPage.set(response.page || 1);
        this.limit.set(response.limit || 10);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading consultants:', err);
        this.error.set(this.translate.instant('admin.consultants.errors.loadError') || 'Failed to load consultants.');
        this.loading.set(false);
      },
    });
  }

  setupSearch(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((term) => this.searchTerm.set(term)),
        tap((term) => this.loadConsultants(1, this.limit(), term)) // Recarrega na página 1
      )
      .subscribe();
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerms.next(inputElement.value);
  }

  goToNewConsultant(): void {
    this.router.navigate(['/admin/consultants/new']);
  }

  editConsultant(consultantId: string): void {
    this.router.navigate(['/admin/consultants/edit', consultantId]);
  }

  deleteConsultant(consultantId: string): void {
    if (
      confirm(
        this.translate.instant('admin.consultants.confirmDelete') || 'Are you sure you want to delete this consultant?'
      )
    ) {
      this.loading.set(true);
      this.consultantService.deleteConsultant(consultantId).subscribe({
        next: () => {
          this.loadConsultants(this.currentPage(), this.limit(), this.searchTerm());
          // Opcional: Mostrar mensagem de sucesso
        },
        error: (err) => {
          console.error('Error deleting consultant:', err);
          this.error.set(
            this.translate.instant('admin.consultants.errors.deleteError') || 'Failed to delete consultant.'
          );
          this.loading.set(false);
        },
      });
    }
  }

  onPageChange(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.loadConsultants(newPage, this.limit(), this.searchTerm());
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalConsultants() / this.limit());
  }

  getPages(): number[] {
    const total = this.totalPages();
    const maxPagesToShow = 5;
    const current = this.currentPage();
    let startPage = Math.max(1, current - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
