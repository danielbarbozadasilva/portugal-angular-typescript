import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  constructor(public translate: TranslateService) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
