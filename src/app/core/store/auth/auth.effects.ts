import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../http/auth.service'; // Correct path
import * as AuthActions from './auth.actions';
import { IResponseError, IAuthResponse, ITokenResponse, IDataResponse } from '../../models/models.auth'; // Import response types

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // Effect for Sign In
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

  // Effect after successful Sign In -> Navigate to dashboard
  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => this.router.navigate(['/admin/dashboard'])) // Navigate on success
      ),
    { dispatch: false } // No further action needed
  );

  // Effect for Logout
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap((action) =>
        this.authService.logoutService({ _id: action.userId }).pipe(
          map((_response: IDataResponse) => AuthActions.logoutSuccess()), // Prefix unused variable
          catchError((error: IResponseError) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

  // Effect after successful Logout -> Navigate to signin
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/signin'])) // Navigate on success
      ),
    { dispatch: false } // No further action needed
  );

  // Effect for Refresh Token
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap((action) =>
        this.authService.refreshTokenService(action.userId).pipe(
          map((response: ITokenResponse) => AuthActions.refreshTokenSuccess({ newToken: response.token! })), // Assert token exists on success
          catchError((error: IResponseError) => of(AuthActions.refreshTokenFailure({ error })))
        )
      )
    )
  );

  // Effect for Check Token
  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      switchMap((action) =>
        this.authService.checkTokenService({ token: action.token }).pipe(
          map((response: ITokenResponse) => AuthActions.checkTokenSuccess({ valid: response.success })), // Use success flag from response
          catchError((error: IResponseError) => of(AuthActions.checkTokenFailure({ error })))
        )
      )
    )
  );

  // Add effects for password recovery/reset if actions exist
  // passwordRecovery$ = createEffect(() => ... );
  // resetPassword$ = createEffect(() => ... );
}
