/* src/app/components/hero/hero.component.ts */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
})
export class HeroComponent {}
