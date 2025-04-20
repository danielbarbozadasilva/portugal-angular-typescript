import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/authentication/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map(response => AuthActions.signInSuccess({ response })),
          catchError(error => of(AuthActions.signInFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(({ userId }) =>
        this.authService.logout(userId).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(error => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(({ userId }) =>
        this.authService.refreshToken(userId).pipe(
          map(result => {
            if (result && result.success && result.data && result.data.token) {
              return AuthActions.refreshTokenSuccess({ newToken: result.data.token });
            }
            return AuthActions.refreshTokenFailure({ error: 'Token não retornado' });
          }),
          catchError(error => of(AuthActions.refreshTokenFailure({ error })))
        )
      )
    )
  );

  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      mergeMap(({ token }) =>
        this.authService.checkToken(token).pipe(
          map(resp => {
            return AuthActions.checkTokenSuccess({ valid: resp.success });
          }),
          catchError(error => of(AuthActions.checkTokenFailure({ error })))
        )
      )
    )
  );
}
