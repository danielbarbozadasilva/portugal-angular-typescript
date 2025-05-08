import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-partner-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './partner-search.component.html',
  styleUrls: ['./partner-search.component.scss'],
})
export class PartnerSearchComponent {
  form = new FormGroup({
    interest: new FormControl(''),
    activityType: new FormControl(''),
    date: new FormControl(''),
    location: new FormControl(''),
  });
}
