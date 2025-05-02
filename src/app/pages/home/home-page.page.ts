import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signUpAgent } from '../../core/store/agent/agent.actions';
import { HomeComponent } from './home-page.component';

@Component({
  standalone: true,
  selector: 'app-home-page',
  template: `
    <div class="container mx-auto mt-10">
      <h1 class="text-xl font-bold text-center mb-8">
        {{ title }}
      </h1>
      <app-home-page></app-home-page>
    </div>
  `,
  imports: [HomeComponent],
})
export class HomePage {
  title = 'HomePage';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  async onSubmit(formData: FormData) {
    this.store.dispatch(signUpAgent(formData as any));
    this.router.navigate(['/']);
  }
}
