import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* Modelos e Ações/Seletores */
import { IActivity, IActivityFilters } from '../../core/models/models.activity';
import { loadActivities } from '../../core/store/activity/activity.actions';
import { selectAllActivities } from '../../core/store/activity/activity.selectors';

/* Componentes standalone */
import { SearchActivitiesComponent } from '../../components/pages/home/search-activities/search-activities.component';
import { HeroComponent } from '../../components/pages/home/hero/hero.component';
import { ShowcaseComponent } from '../../components/pages/home/show-case/showcase.component';
import { ApresentationComponent } from '../../components/pages/home/apresentation/apresentation.component';
import { GastronomyComponent } from '../../components/pages/home/gastronomy/gastronomy.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    LayoutComponent,            // <-- Import do layout standalone
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

  constructor(private store: Store, private translate: TranslateService) {
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
        this.activities = activitiesFromStore;
        // Ajuste do total de páginas, se desejar paginar com base no length do array
        this.totalPages = 1; // Exemplo fixo
      });

    this.fetchActivities();
  }

  ngOnDestroy(): void {
    // Evita vazamentos de memória ao destruir o componente
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchActivities(): void {
    // Despacha action para carregar atividades com base nos filtros
    this.store.dispatch(loadActivities({ filters: this.filters }));
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
    }
  }

  handleSearch(): void {
    this.currentPage = 1;
    this.fetchActivities();
  }

  handlePageChange(page: number): void {
    this.currentPage = page;
    this.fetchActivities();
  }
}
