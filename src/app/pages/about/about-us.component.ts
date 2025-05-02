import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router'; // Importar RouterLink

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
  ],
  selector: 'app-about-page',
  templateUrl: 'about-us.component.html',
})
export class AboutUsComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt-PT', 'pt-BR', 'en-US', 'es-ES', 'fr-FR']);
    this.translate.setDefaultLang('pt-BR');
  }
}
