import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-agent-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-agent-edit.component.html',
  styleUrls: ['./profile-agent-edit.component.scss'],
})
export class ProfileAgentComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    specialty: new FormControl(''),
    contact: new FormControl(''),
    document: new FormControl(''),
    address: new FormControl(''),
    bankData: new FormControl(''),
  });
}
