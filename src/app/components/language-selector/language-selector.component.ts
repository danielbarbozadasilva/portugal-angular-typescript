import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class LanguageSelectorComponent {
  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  constructor(private translate: TranslateService) {}

  /**
   * Método chamado a cada mudança no <select>, recebendo o evento nativo.
   */
  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const selectedLang = selectElement.value;
      this.changeLanguage(selectedLang);
    }
  }

  /**
   * Altera o idioma usando o serviço do ngx-translate.
   */
  private changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
