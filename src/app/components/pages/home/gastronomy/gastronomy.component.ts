import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface ITestimonial {
  id: number;
  name: string;
  text: string;
  img: string;
  alt: string;
}

@Component({
  selector: 'app-gastronomy',
  templateUrl: './gastronomy.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class GastronomyComponent {
  testimonials: ITestimonial[] = [];

  constructor(private translate: TranslateService) {
    this.testimonials = [
      {
        id: 1,
        name: this.translate.instant('home.foodPastelNataTitle'),
        text: this.translate.instant('home.foodPastelNataText'),
        img: 'assets/img/09.jpg',
        alt: this.translate.instant('home.foodPastelNataAlt'),
      },
      {
        id: 2,
        name: this.translate.instant('home.foodFrancesinhaTitle'),
        text: this.translate.instant('home.foodFrancesinhaText'),
        img: 'assets/img/08.jpg',
        alt: this.translate.instant('home.foodFrancesinhaAlt'),
      },
      {
        id: 3,
        name: this.translate.instant('home.foodBacalhauTitle'),
        text: this.translate.instant('home.foodBacalhauText'),
        img: 'assets/img/07.jpg',
        alt: this.translate.instant('home.foodBacalhauAlt'),
      },
    ];
  }
}
