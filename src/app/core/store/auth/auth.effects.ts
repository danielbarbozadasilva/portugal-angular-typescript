import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../http/auth.service';
import * as AuthActions from './auth.actions';
import { IAuthResponse, ITokenResponse, IDataResponse } from '../../models/models.auth';
import { IResponseError } from '@app/core/models/models.index';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(a =>
        this.authService.loginService({ email: a.credentials.email, password: a.credentials.password }).pipe(
          map((r: IAuthResponse) => AuthActions.signInSuccess({ response: r })),
          catchError((e: IResponseError) => of(AuthActions.signInFailure({ error: e })))
        )
      )
    )
  );

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => this.router.navigate(['/admin/dashboard']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(a =>
        this.authService.logoutService({ _id: a.userId }).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((e: IResponseError) => of(AuthActions.logoutFailure({ error: e })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/signin']))
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(a =>
        this.authService.refreshTokenService(a.userId).pipe(
          map((r: ITokenResponse) => AuthActions.refreshTokenSuccess({ newToken: r.token || '' })),
          catchError((e: IResponseError) => of(AuthActions.refreshTokenFailure({ error: e })))
        )
      )
    )
  );

  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      switchMap(a =>
        this.authService.checkTokenService({ token: a.token }).pipe(
          map((r: ITokenResponse) => AuthActions.checkTokenSuccess({ valid: r.success })),
          catchError((e: IResponseError) => of(AuthActions.checkTokenFailure({ error: e })))
        )
      )
    )
  );

  recoveryPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.recoveryPassword),
      switchMap(a =>
        this.authService.passwordRecoveryService({ email: a.email }).pipe(
          map((r: IDataResponse) => AuthActions.recoveryPasswordSuccess({ response: r })),
          catchError((e: IResponseError) => of(AuthActions.recoveryPasswordFailure({ error: e })))
        )
      )
    )
  );
}
