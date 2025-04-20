import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { loginRequest } from 'src/app/core/store/auth/auth.actions';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private store: Store<AppState>) {}

  onLogin() {
    // Dispara ação via NgRx
    this.store.dispatch(loginRequest({ username: this.username, password: this.password }));
  }
}
