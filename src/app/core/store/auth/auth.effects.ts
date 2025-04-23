import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../../core/http/auth.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IResponseError, ITokenResponse } from '../../models/models.auth';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  /**
   * Efeito responsável por realizar o login (signIn).
   * Dispara signInSuccess ou signInFailure.
   */
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ email, password }) =>
        this.authService.loginService({ email, password }).pipe(
          map((response: any) => {
            return AuthActions.signInSuccess(response);
          }),
          catchError((error) =>
            of(AuthActions.signInFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * Efeito responsável pelo logout.
   * Dispara logoutSuccess ou logoutFailure.
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(({ userId }) =>
        this.authService.logoutService({ _id: userId }).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) =>
            of(AuthActions.logoutFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * Efeito para renovar o token (refreshToken).
   * Dispara refreshTokenSuccess ou refreshTokenFailure.
   */
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(({ userId }) =>
        this.authService.refreshTokenService(userId).pipe(
          map((result: ITokenResponse | IResponseError) => {
            if (result && 'success' in result && result.success) {
              // Verifica se existe result.data e se há um token.
              const tokenFound =
                (result as ITokenResponse)?.data?.token || null;
              if (tokenFound) {
                return AuthActions.refreshTokenSuccess({ newToken: tokenFound });
              }
              return AuthActions.refreshTokenFailure({ error: 'Token não retornado' });
            }
            return AuthActions.refreshTokenFailure({ error: 'Falha ao renovar token' });
          }),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * Efeito para checar se um token ainda é válido.
   * Dispara checkTokenSuccess ou checkTokenFailure.
   */
  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      mergeMap(({ token }) =>
        this.authService.checkTokenService({ token }).pipe(
          map((resp: ITokenResponse | IResponseError) => {
            // Neste ponto, assumindo que a service retorne { success: boolean }
            // se o token ainda é válido.
            if ('success' in resp) {
              return AuthActions.checkTokenSuccess({ valid: resp.success });
            }
            return AuthActions.checkTokenFailure({ error: 'Resposta inválida' });
          }),
          catchError((error) =>
            of(AuthActions.checkTokenFailure({ error }))
          )
        )
      )
    )
  );
}
