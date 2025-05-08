import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-apresentation',
  templateUrl: './apresentation.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ApresentationComponent {
  constructor(private translate: TranslateService) {}
}
