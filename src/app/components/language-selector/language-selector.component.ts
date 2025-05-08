import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  availableLangs: string[] = [];
  currentLang: string = '';
  showDropdown = false;

  constructor(public translate: TranslateService) {
    this.availableLangs = translate.getLangs();
    this.currentLang = translate.currentLang || translate.defaultLang;
    translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      localStorage.setItem('language', event.lang);
      this.showDropdown = false;
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  changeLang(lang: string): void {
    if (lang !== this.currentLang) {
      this.translate.use(lang);
    }
    this.showDropdown = false;
  }

  getLangDisplay(lang: string): string {
    switch (lang) {
      case 'pt-PT':
        return 'Português (PT)';
      case 'pt-BR':
        return 'Português (BR)';
      case 'en-US':
        return 'English (US)';
      case 'es-ES':
        return 'Español (ES)';
      case 'fr-FR':
        return 'Français (FR)';
      default:
        return lang;
    }
  }
}
