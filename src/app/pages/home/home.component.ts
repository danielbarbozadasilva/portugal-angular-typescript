import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* Modelos e Ações/Seletores */
import { IActivity, IActivityFilters } from '../../core/models/models.activity';
import { loadActivities } from '../../core/store/activity/activity.actions';
import { selectAllActivities, selectActivityError } from '../../core/store/activity/activity.selectors'; // Importar selectActivityError

/* Componentes standalone */
import { SearchActivitiesComponent } from '../../components/pages/home/search-activities/search-activities.component';
import { HeroComponent } from '../../components/pages/home/hero/hero.component';
import { ShowcaseComponent } from '../../components/pages/home/show-case/showcase.component';
import { ApresentationComponent } from '../../components/pages/home/apresentation/apresentation.component';
import { GastronomyComponent } from '../../components/pages/home/gastronomy/gastronomy.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
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

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
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
      .subscribe((activitiesFromStore) => {
        console.log('[HomeComponent] Received activities from store:', activitiesFromStore); // Log das atividades recebidas
        this.activities = activitiesFromStore;
        // TODO: A lógica de totalPages provavelmente precisa ser ajustada
        // com base na resposta da API (se ela retornar metadados de paginação)
        // Se a API não retornar total, calcular com base no recebido (pode não ser o total real)
        this.totalPages =
          activitiesFromStore.length > 0 ? Math.ceil(activitiesFromStore.length / this.itemsPerPage) : 1; // Ajuste simples
      });

    // Adicionar subscrição para erros (opcional, mas útil para debug)
    this.store
      .select(selectActivityError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) {
          console.error('[HomeComponent] Error from Activity Store:', error);
          // Aqui você pode exibir uma mensagem de erro para o usuário, se desejar
        }
      });

    this.fetchActivities();
  }

  ngOnDestroy(): void {
    // Evita vazamentos de memória ao destruir o componente
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchActivities(): void {
    console.log('[HomeComponent] Fetching activities with filters:', this.filters); // Log antes de despachar
    // Despacha action para carregar atividades com base nos filtros e paginação atual
    // Nota: A API precisa suportar paginação via parâmetros (ex: page, limit)
    // Se a API não suportar, a paginação terá que ser feita no frontend após receber *todos* os dados.
    const filtersWithPagination = {
      ...this.filters,
      page: this.currentPage, // Exemplo: Adiciona página aos filtros
      limit: this.itemsPerPage, // Exemplo: Adiciona limite aos filtros
    };
    this.store.dispatch(loadActivities({ filters: filtersWithPagination }));
  }

  handleFilterChange(name: string, value: string): void {
    // Caso o filtro seja 'sort: location', tentamos obter a posição do usuário
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
            this.filters = { ...this.filters, sort: value, lat: '', lng: '' };
            this.currentPage = 1;
            this.fetchActivities();
          }
        );
      } else {
        console.error('Geolocalização não é suportada pelo navegador.');
        this.filters = { ...this.filters, sort: value, lat: '', lng: '' };
        this.currentPage = 1;
        this.fetchActivities();
      }
    } else {
      // Atualiza quaisquer outros filtros
      this.filters = { ...this.filters, [name]: value };
      // Não busca aqui, espera o clique no botão ou mudança de página
    }
  }

  handleSearch(): void {
    this.currentPage = 1; // Reseta para a primeira página ao buscar
    this.fetchActivities();
  }

  handlePageChange(page: number): void {
    this.currentPage = page;
    this.fetchActivities(); // Busca a nova página
  }
}
