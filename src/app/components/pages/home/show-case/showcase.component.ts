/* src/app/components/showcase/showcase.component.ts */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface IShowcaseData {
  id: number;
  title: string;
  lead: string;
  bgImage: string;
  btnLabel: string;
  reverse: boolean;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent {
  showcases: IShowcaseData[] = [];

  constructor(private translate: TranslateService) {
    this.showcases = [
      {
        id: 1,
        title: this.translate.instant('home.showcase1Title'),
        lead: this.translate.instant('home.showcase1Lead'),
        bgImage: 'assets/img/11111.jpg',
        btnLabel: this.translate.instant('home.showcase1Btn'),
        reverse: true
      },
      {
        id: 2,
        title: this.translate.instant('home.showcase2Title'),
        lead: this.translate.instant('home.showcase2Lead'),
        bgImage: 'assets/img/777.jpg',
        btnLabel: this.translate.instant('home.showcase2Btn'),
        reverse: false
      },
      {
        id: 3,
        title: this.translate.instant('home.showcase3Title'),
        lead: this.translate.instant('home.showcase3Lead'),
        bgImage: './assets/img/999.jpeg',
        btnLabel: this.translate.instant('home.showcase3Btn'),
        reverse: true
      }
    ];
  }
  
  languages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'pt-PT'];

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
