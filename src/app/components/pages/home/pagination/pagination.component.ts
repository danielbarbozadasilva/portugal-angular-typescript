import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pagination',
  template: `
    <div class="flex items-center justify-center mt-4">
      <button 
        class="px-3 py-1 mx-1 border rounded"
        (click)="goToPrevious()"
        [disabled]="currentPage === 1">
        &laquo;
      </button>
      <span class="mx-2">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button 
        class="px-3 py-1 mx-1 border rounded"
        (click)="goToNext()"
        [disabled]="currentPage === totalPages">
        &raquo;
      </button>
    </div>
  `
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  goToPrevious(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  constructor(public translate: TranslateService) { }

  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
