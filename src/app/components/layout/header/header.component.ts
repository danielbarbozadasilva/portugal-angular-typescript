import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LanguageSelectorComponent
  ]
})
export class HeaderComponent {
  constructor(public translate: TranslateService) {}

  // Exemplo de línguas caso necessário no Header
  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
