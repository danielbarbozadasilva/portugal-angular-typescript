import { Component } from '@angular/core'
import { LanguageSelectorComponent } from '../../language-selector/language-selector.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSelectorComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {}
