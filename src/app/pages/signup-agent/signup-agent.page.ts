import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createAgent } from '../../core/store/agent/agent.actions';
import { IAgent } from '../../core/models/models.agent';

/* Se desejar standalone, importe o componente Agent aqui */
import { SignupAgentComponent } from './signup-agent-component'; // <== Ajustar path real

@Component({
  standalone: true,
  selector: 'app-signup-agent-page',
  template: `
    <div class="container mx-auto mt-10">
      <h1 class="text-xl font-bold text-center mb-8">
        {{ title }}
      </h1>
      <!-- Usando o componente signup-agent -->
      <app-signup-agent></app-signup-agent>
    </div>
  `,
  imports: [
    SignupAgentComponent,
  ],
})
export class SignupAgentPage {
  title = 'SignUp Agent Page';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  async onSubmit(formData: IAgent) {
    const agent = formData as unknown as IAgent;
    this.store.dispatch(createAgent({ agent }));
    this.router.navigate(['/']);
  }
}
