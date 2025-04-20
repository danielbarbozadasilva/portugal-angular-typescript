import { createAction, props } from '@ngrx/store';

// LOGIN
export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

// REGISTER
export const registerRequest = createAction(
  '[Auth] Register Request',
  props<{ username: string; password: string; email: string }>()
);

export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

// LOGOUT
export const logout = createAction('[Auth] Logout');
