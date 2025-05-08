import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signUpClient } from '../../core/store/client/client.actions';
import { IClient } from '../../core/models/models.client';
import { SignUpClientComponent } from './signup-client-component';

@Component({
  standalone: true,
  selector: 'app-signup-client-page',
  template: `
    <div class="container mx-auto mt-10">
      <h1 class="text-xl font-bold text-center mb-8">
        {{ title }}
      </h1>
      <app-signup-client-component></app-signup-client-component>
    </div>
  `,
  imports: [SignUpClientComponent],
})
export class SignupClientPage {
  title = 'SignUp Client Page';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  async onSubmit(formData: IClient) {
    // Exemplo de método no nível de página (caso quisesse delegar pro pai).
    // No código final, o dispatch é feito dentro do componente filho. Se quiser,
    // pode centralizar aqui em vez de despachar no componente.
    this.store.dispatch(signUpClient({ data: formData }));
    this.router.navigate(['/']);
  }
}
