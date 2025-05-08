import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-client',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss'],
})
export class ProfileClientComponent {}
