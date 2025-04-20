import { createAction, props } from '@ngrx/store';
import { IAuthResponse } from '../../models/models.index';

// Login
export const signIn = createAction(
  '[Auth] SignIn',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[Auth] SignIn Success',
  props<{ response: IAuthResponse }>()
);

export const signInFailure = createAction(
  '[Auth] SignIn Failure',
  props<{ error: any }>()
);

// Logout
export const logout = createAction(
  '[Auth] Logout',
  props<{ userId: string }>()
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);

// Refresh Token
export const refreshToken = createAction(
  '[Auth] Refresh Token',
  props<{ userId: string }>()
);

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ newToken: string }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: any }>()
);

// Check Token
export const checkToken = createAction(
  '[Auth] Check Token',
  props<{ token: string }>()
);

export const checkTokenSuccess = createAction(
  '[Auth] Check Token Success',
  props<{ valid: boolean }>()
);

export const checkTokenFailure = createAction(
  '[Auth] Check Token Failure',
  props<{ error: any }>()
);
