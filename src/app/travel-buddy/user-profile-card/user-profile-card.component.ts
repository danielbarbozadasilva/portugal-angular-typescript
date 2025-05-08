import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss'],
})
export class UserProfileCardComponent {
  @Input() name = '-';
  @Input() interests = '-';
  @Input() location = '-';
}
