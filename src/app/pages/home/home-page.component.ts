/* src/app/pages/home.component.ts */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Bibliotecas de terceiros */
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/* Modelos e Ações/Seletores do Projeto */
import { IActivity, IActivityFilters } from '../../core/models/models.activity';
import { loadActivities } from '../../core/store/activity/activity.actions';
import { selectAllActivities, selectActivityError } from '../../core/store/activity/activity.selectors';

/* Componentes standalone usados no template */
import { SearchActivitiesComponent } from '../../components/pages/home/search-activities/search-activities.component';
import { HeroComponent } from '../../components/pages/home/hero/hero.component';
import { ShowcaseComponent } from '../../components/pages/home/show-case/showcase.component';
import { ApresentationComponent } from '../../components/pages/home/apresentation/apresentation.component';
import { GastronomyComponent } from '../../components/pages/home/gastronomy/gastronomy.component';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  /**
   * 'imports' deve ser único. Aqui incluímos todos os módulos/componentes standalone
   * que serão utilizados pelo template deste componente.
   */
  imports: [
    CommonModule,
    SearchActivitiesComponent,
    HeroComponent,
    ShowcaseComponent,
    ApresentationComponent,
    GastronomyComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Home';
  activities: IActivity[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  filters: IActivityFilters = {
    keyword: '',
    category: '',
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
    language: '',
    lat: '',
    lng: '',
    sort: '',
  };

  /**
   * Subject para emissão de evento de destruição do componente.
   * Usado para cancelar subscriptions do RxJS e evitar memory leaks.
   */
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store, // Tipar Store, se quiser: private store: Store<AppState>
    private translate: TranslateService
  ) {
    // Configurações iniciais do ngx-translate
    this.translate.addLangs(['pt-PT', 'pt-BR', 'en-US', 'es-ES', 'fr-FR']);
    this.translate.setDefaultLang('pt-BR');
  }

  ngOnInit(): void {
    // Observa as atividades no Store e atualiza a variável local
    this.store
      .select(selectAllActivities)
      .pipe(takeUntil(this.destroy$))
      .subscribe((activitiesFromStore: IActivity[]) => {
        console.log('[HomeComponent] Received activities from store:', activitiesFromStore);
        this.activities = activitiesFromStore;

        // Ajuste simples para calcular número de páginas
        this.totalPages =
          activitiesFromStore.length > 0 ? Math.ceil(activitiesFromStore.length / this.itemsPerPage) : 1;
      });

    // Observa possíveis erros de carregamento
    this.store
      .select(selectActivityError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error: any) => {
        if (error) {
          console.error('[HomeComponent] Error from Activity Store:', error);
          // Exibir uma mensagem de erro para o usuário, se necessário
        }
      });

    // Ao iniciar, carrega as atividades
    this.fetchActivities();
  }

  ngOnDestroy(): void {
    // Emite e completa o Subject para encerrar subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Despacha action para carregar atividades com base nos filtros e paginação atual.
   * Se a API suportar paginação, ela deve aceitar parâmetros 'page' e 'limit'.
   */
  fetchActivities(): void {
    console.log('[HomeComponent] Fetching activities with filters:', this.filters);
    const filtersWithPagination = {
      ...this.filters,
      page: this.currentPage,
      limit: this.itemsPerPage,
    };
    this.store.dispatch(loadActivities({ filters: filtersWithPagination }));
  }

  /**
   * Lida com alterações de filtros vindas do componente de busca (SearchActivitiesComponent)
   * ou qualquer outro input de filtro.
   */
  handleFilterChange(name: string, value: string): void {
    // Exemplo: se name === 'sort' && value === 'location', obtem geolocalização do usuário
    if (name === 'sort' && value === 'location') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.filters = {
              ...this.filters,
              sort: value,
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString(),
            };
            this.currentPage = 1;
            this.fetchActivities();
          },
          (error) => {
            console.error('Erro ao obter localização:', error);
            this.filters = {
              ...this.filters,
              sort: value,
              lat: '',
              lng: '',
            };
            this.currentPage = 1;
            this.fetchActivities();
          }
        );
      } else {
        console.error('Geolocalização não é suportada pelo navegador.');
        this.filters = {
          ...this.filters,
          sort: value,
          lat: '',
          lng: '',
        };
        this.currentPage = 1;
        this.fetchActivities();
      }
    } else {
      // Para qualquer outro filtro, apenas atualiza localmente
      this.filters = { ...this.filters, [name]: value };
      // OBS: aqui não chamamos fetchActivities() imediatamente;
      // pode-se optar por chamar se quiser busca imediata no onChange
      // ou aguardar um 'Apply Filter' do usuário.
    }
  }

  /**
   * Método chamado quando o usuário confirma a busca.
   */
  handleSearch(): void {
    this.currentPage = 1; // Reseta para a primeira página
    this.fetchActivities();
  }

  /**
   * Gerencia a mudança de página do componente de paginação.
   */
  handlePageChange(page: number): void {
    this.currentPage = page;
    this.fetchActivities(); // Chama novamente a API para nova página
  }
}
