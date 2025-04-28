import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthLoading } from '../../core/store/auth/auth.selectors'; 
import { signIn } from '../../core/store/auth/auth.actions'

/**
 * Componente de Login (SignIn) em modo standalone,
 * importando os módulos necessários (CommonModule, ReactiveFormsModule, TranslateModule).
 */
@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin-component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Seleciona do estado se está em loading
    this.loading$ = this.store.select(selectAuthLoading);

    // Cria o form reativo
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Submit do formulário: dispara action signIn com os campos do form.
   */
  submitForm(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    // Dispara a action de login
    this.store.dispatch(signIn({ email, password }));
  }
}
