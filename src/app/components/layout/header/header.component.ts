import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../language-selector/language-selector.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, LanguageSelectorComponent, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public translate: TranslateService) {}

  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
