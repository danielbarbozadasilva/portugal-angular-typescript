import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createAgent } from '../../core/store/agent/agent.actions';
import { IAgent } from '../../core/models/models.agent';

@Component({
  selector: 'app-signup-agent-page',
  template: `
    <div class="container mx-auto mt-10">
      <h1 class="text-xl font-bold text-center mb-8">
        {{ title }}
      </h1>
      <app-signup-agent></app-signup-agent>
    </div>
  `,
})
export class SignupAgentPage {
  title = 'SignUp Agent Page';

  constructor(
    private store: Store,
    private router: Router
  ) { }

  async onSubmit(formData: IAgent) {
    const agent = formData as unknown as IAgent;

    // Dispatch da ação
    this.store.dispatch(createAgent({ agent }));

    // Navegar após dispatch
    this.router.navigate(['/']);
  }
}
