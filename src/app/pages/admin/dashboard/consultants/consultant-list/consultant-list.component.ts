import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.scss'],
})
export class ConsultantListComponent {}
