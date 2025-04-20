import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atividades-turisticas-portugal';

  constructor(private translate: TranslateService) {
    // Idiomas suportados
    this.translate.addLangs(['pt-BR', 'pt-PT', 'en-US', 'es-ES', 'fr-FR']);

    // Define um idioma padrão
    this.translate.setDefaultLang('en-US');

    // Opcional: detecção automática do idioma do navegador
    const browserLang = this.translate.getBrowserLang();
    if (browserLang) {
      // Ajuste aqui se quiser mapear 'pt' -> 'pt-BR' ou algo do tipo
      this.translate.use(browserLang.match(/pt|en|es|fr/) ? browserLang : 'en-US');
    } else {
      this.translate.use('en-US');
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
