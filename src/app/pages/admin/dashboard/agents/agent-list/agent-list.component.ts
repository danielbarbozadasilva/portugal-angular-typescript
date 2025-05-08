import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AgentService } from '@app/core/http'; // Ajuste o path se necessário
import { IAgent } from '@app/core/models/models.agent'; // Ajuste o path se necessário
import { IPaginatedResponse } from '@app/core/models/models.user'; // Ajuste o path se necessário
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-agent-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './agent-list.component.html',
  // styleUrls: ['./agent-list.component.scss'], // Removido ou ajustado se necessário
})
export class AgentListComponent implements OnInit {
  private agentService = inject(AgentService);
  private router = inject(Router);
  translate = inject(TranslateService);

  agents = signal<IAgent[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  totalAgents = signal<number>(0);
  currentPage = signal<number>(1);
  limit = signal<number>(10); // Itens por página

  private searchTerms = new Subject<string>();
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.loadAgents(this.currentPage(), this.limit());
    this.setupSearch();
  }

  loadAgents(page: number, limit: number, searchTerm?: string): void {
    this.loading.set(true);
    this.error.set(null);
    // Ajustar os filtros conforme necessário para buscar por nome, especialidade, contato
    const filters = searchTerm ? { keyword: searchTerm } : {};

    this.agentService.getAgents(page, limit, filters).subscribe({
      next: (response: IPaginatedResponse<IAgent>) => {
        this.agents.set(response.data);
        this.totalAgents.set(response.total || 0);
        this.currentPage.set(response.page || 1);
        this.limit.set(response.limit || 10);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading agents:', err);
        this.error.set(this.translate.instant('admin.agents.errors.loadError') || 'Failed to load agents.');
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
        // Usar switchMap pode ser mais robusto para cancelar requests anteriores
        tap((term) => this.loadAgents(1, this.limit(), term)) // Recarrega na página 1 ao buscar
      )
      .subscribe();
  }

  onSearchInput(event: Event): void {
    // Renomeado para evitar conflito com o nome do método de busca
    const inputElement = event.target as HTMLInputElement;
    this.searchTerms.next(inputElement.value);
  }

  // Método para buscar explicitamente (se houver um botão)
  search(): void {
    this.loadAgents(1, this.limit(), this.searchTerm());
  }

  goToNewAgent(): void {
    this.router.navigate(['/admin/agents/new']); // Ajustado para rota correta
  }

  editAgent(agentId: string): void {
    this.router.navigate(['/admin/agents/edit', agentId]); // Ajustado para rota correta
  }

  deleteAgent(agentId: string): void {
    // Usar um modal/dialog seria melhor em produção
    if (
      confirm(this.translate.instant('admin.agents.confirmDelete') || 'Are you sure you want to delete this agent?')
    ) {
      this.loading.set(true); // Mostrar loading durante a exclusão
      this.agentService.deleteAgent(agentId).subscribe({
        next: () => {
          // Recarregar a lista na página atual após a exclusão
          this.loadAgents(this.currentPage(), this.limit(), this.searchTerm());
          // Opcional: Mostrar mensagem de sucesso (ex: com um ToastService)
        },
        error: (err) => {
          console.error('Error deleting agent:', err);
          this.error.set(this.translate.instant('admin.agents.errors.deleteError') || 'Failed to delete agent.');
          this.loading.set(false); // Parar loading mesmo em caso de erro
        },
      });
    }
  }

  onPageChange(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.loadAgents(newPage, this.limit(), this.searchTerm());
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalAgents() / this.limit());
  }

  getPages(): number[] {
    const total = this.totalPages();
    // Limitar o número de páginas exibidas se forem muitas
    const maxPagesToShow = 5;
    const current = this.currentPage();
    let startPage = Math.max(1, current - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    // Ajustar se estiver perto do fim
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
