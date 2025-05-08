import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signUpAgent } from '../../core/store/agent/agent.actions';
import { SignupAgentComponent } from './signup-agent-component';

@Component({
  standalone: true,
  selector: 'app-signup-agent-page',
  template: `
    <div class="container mx-auto mt-10">
      <h1 class="text-xl font-bold text-center mb-8">
        {{ title }}
      </h1>
      <app-signup-agent-component></app-signup-agent-component>
    </div>
  `,
  imports: [SignupAgentComponent],
})
export class SignupAgentPage {
  title = 'SignUp Agent Page';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  async onSubmit(formData: any) {
    this.store.dispatch(signUpAgent(formData as any));
    this.router.navigate(['/']);
  }
}
