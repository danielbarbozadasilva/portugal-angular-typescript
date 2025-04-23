import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Aqui você chamaria seu service ou store para criar o client, etc.

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder
    // injete store ou service para criar user e client
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      // outros campos que deseje
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

   // const payload = this.registerForm.value;
    // Exemplo: this.store.dispatch(createClient({ ...payload }));
    alert('Registro efetuado (exemplo). Implemente a lógica real.');
  }
}
