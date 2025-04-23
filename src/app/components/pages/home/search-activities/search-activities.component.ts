import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { IActivity, IActivityFilters } from '../../../../core/models/models.activity';

// Import do PaginationComponent (ajuste o caminho conforme seu projeto)
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  standalone: true,
  selector: 'app-search-activities',
  templateUrl: './search-activities.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    PaginationComponent
  ]
})
export class SearchActivitiesComponent {
  @Input() filters!: IActivityFilters;
  @Input() activities: IActivity[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() onFilterChange = new EventEmitter<{ name: string; value: string }>();
  @Output() onSearch = new EventEmitter<void>();
  @Output() onPageChange = new EventEmitter<number>();

  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  constructor(public translate: TranslateService) { }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  handleFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    this.onFilterChange.emit({ name, value });
  }

  handleSearchClick(): void {
    this.onSearch.emit();
  }

  handlePageChange(page: number): void {
    this.onPageChange.emit(page);
  }
}
