// filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\admin\activities\activity-form\activity-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss'],
})
export class ActivityFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dates: new FormArray([]),
    location: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    images: new FormControl([]),
    featured: new FormControl(false),
    promotion: new FormControl(false),
  });
}
