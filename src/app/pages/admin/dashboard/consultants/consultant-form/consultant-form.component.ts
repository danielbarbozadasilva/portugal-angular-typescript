import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.scss'],
})
export class ConsultantFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    specialty: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    document: new FormControl(''),
    address: new FormControl(''),
  });
}
