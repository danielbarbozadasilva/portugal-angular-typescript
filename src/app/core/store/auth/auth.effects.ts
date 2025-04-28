import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../http/auth.service'; // Ajuste o path
import * as AuthActions from './auth.actions';
import {
  IResponseError,
  IAuthResponse,
  ITokenResponse,
  IDataResponse,
} from '../../models/models.auth';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Efeito para login (signIn).
   * Chama o service, e em caso de sucesso, dispara signInSuccess,
   * caso contrário, signInFailure.
   */
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap((action) =>
        this.authService.loginService({ email: action.email, password: action.password }).pipe(
          map((response: IAuthResponse) => AuthActions.signInSuccess({ response })),
          catchError((error: IResponseError) => of(AuthActions.signInFailure({ error })))
        )
      )
    )
  );

  /**
   * Efeito após login bem-sucedido.
   * Navega para "/admin/dashboard" ao receber signInSuccess.
   */
  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => this.router.navigate(['/admin/dashboard']))
      ),
    { dispatch: false }
  );

  /**
   * Efeito para logout.
   * Chama o service logoutService, em caso de sucesso dispara logoutSuccess,
   * senão logoutFailure.
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap((action) =>
        this.authService.logoutService({ _id: action.userId }).pipe(
          map((_response: IDataResponse) => AuthActions.logoutSuccess()),
          catchError((error: IResponseError) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

  /**
   * Após logout bem-sucedido, navega para "/signin".
   */
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/signin']))
      ),
    { dispatch: false }
  );

  /**
   * Efeito para renovação de token (refreshToken).
   */
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap((action) =>
        this.authService.refreshTokenService(action.userId).pipe(
          map((response: ITokenResponse) => AuthActions.refreshTokenSuccess({ newToken: response.token! })),
          catchError((error: IResponseError) => of(AuthActions.refreshTokenFailure({ error })))
        )
      )
    )
  );

  /**
   * Efeito para checar validade de token (checkToken).
   */
  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      switchMap((action) =>
        this.authService.checkTokenService({ token: action.token }).pipe(
          map((response: ITokenResponse) => AuthActions.checkTokenSuccess({ valid: response.success })),
          catchError((error: IResponseError) => of(AuthActions.checkTokenFailure({ error })))
        )
      )
    )
  );

  // Efeitos adicionais para recuperação de senha ou reset, se existirem ações correspondentes.
}
