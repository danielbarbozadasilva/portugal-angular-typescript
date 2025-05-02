import { createAction, props } from '@ngrx/store';
import { IDataResponse, IResponseError } from '@app/core/models/models.index';

export const signIn = createAction('[Auth] Sign In', props<{ credentials: any }>());
export const signInSuccess = createAction('[Auth] Sign In Success', props<{ response: any }>());
export const signInFailure = createAction('[Auth] Sign In Failure', props<{ error: IResponseError | string }>());

export const logout = createAction('[Auth] Logout', props<{ userId: string }>());
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: IResponseError | string }>());

export const refreshToken = createAction('[Auth] Refresh Token', props<{ userId: string }>());
export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success', props<{ newToken: string }>());
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure', props<{ error: IResponseError | string }>());

export const checkToken = createAction('[Auth] Check Token', props<{ token: string }>());
export const checkTokenSuccess = createAction('[Auth] Check Token Success', props<{ valid: boolean; user?: any }>());
export const checkTokenFailure = createAction('[Auth] Check Token Failure', props<{ error: IResponseError | string }>());

export const clearAuthError = createAction('[Auth] Clear Auth Error');

export const recoveryPassword = createAction('[Auth] Recovery Password', props<{ email: string }>());
export const recoveryPasswordSuccess = createAction('[Auth] Recovery Password Success', props<{ response: IDataResponse }>());
export const recoveryPasswordFailure = createAction('[Auth] Recovery Password Failure', props<{ error: IResponseError | string }>());
