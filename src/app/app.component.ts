import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    CommonModule, // para *ngIf, *ngFor, etc
    RouterModule, // para usar <router-outlet>
    TranslateModule, // para pipe 'translate'
    LayoutComponent, // Adicionar LayoutComponent
  ],
})
export class AppComponent {
  // Propriedade usada no footer do template
  public currentYear: number = new Date().getFullYear();

  constructor(private translate: TranslateService) {
    // Define idiomas suportados
    this.translate.addLangs(['pt-BR', 'pt-PT', 'en-US', 'es-ES', 'fr-FR']);
    // Idioma padrão
    const defaultLang = 'en-US';
    this.translate.setDefaultLang(defaultLang);
    this.useLanguage(defaultLang);
  }

  /**
   * Altera o idioma ativo da aplicação.
   */
  public useLanguage(lang: string): void {
    this.translate.use(lang).subscribe({
      next: () => {
        console.log(`Idioma alterado para ${lang}`);
      },
      error: (err) => {
        console.error(`Erro ao carregar idioma ${lang}:`, err);
      },
    });
  }
}
