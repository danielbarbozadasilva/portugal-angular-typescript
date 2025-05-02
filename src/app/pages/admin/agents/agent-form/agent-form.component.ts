// filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\admin\agents\agent-form\agent-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
})
export class AgentFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    specialty: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    document: new FormControl(''),
    address: new FormControl(''),
    bankData: new FormControl(''),
  });
}
