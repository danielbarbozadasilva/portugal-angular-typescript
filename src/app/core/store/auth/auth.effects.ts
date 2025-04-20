import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../authentication/auth.service';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // Exemplo de efeito de login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap(({ username, password }) => {
        // Exemplo simulado:
        // Aqui você chamaria um serviço HTTP real; vamos simular uma resposta:
        if (username === 'admin' && password === 'admin') {
          const token = 'FAKE-TOKEN-123';
          return of(AuthActions.loginSuccess({ token }));
        } else {
          return of(AuthActions.loginFailure({ error: 'Invalid credentials' }));
        }
      })
    )
  );

  // Ao ter sucesso no login, salvar token no localStorage via AuthService
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token }) => {
          this.authService.setToken(token);
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  // Efeito de register
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerRequest),
      switchMap(({ username, password, email }) => {
        // Simulação de sucesso, substitua por chamada HTTP real
        return of(AuthActions.registerSuccess());
      }),
      catchError((error) => of(AuthActions.registerFailure({ error })))
    )
  );

  // Após registerSuccess, redirecionar para login
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // LOGOUT
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearToken();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
