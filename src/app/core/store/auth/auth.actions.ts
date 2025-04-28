import { createAction, props } from '@ngrx/store';

/**
 * Ação para iniciar o processo de login (sign in).
 * Recebe e-mail e senha.
 */
export const signIn = createAction(
  '[Auth] SignIn',
  props<{ email: string; password: string }>()
);

/**
 * Ação disparada quando o login (sign in) é bem-sucedido.
 * Recebe a resposta do back-end (IAuthResponse).
 */
export const signInSuccess = createAction(
  '[Auth] SignIn Success',
  props<{ response: any }>()
);

/**
 * Ação disparada quando o login (sign in) falha.
 * Recebe um objeto de erro.
 */
export const signInFailure = createAction(
  '[Auth] SignIn Failure',
  props<{ error: any }>()
);

/**
 * Ação para iniciar o processo de logout.
 * Recebe o ID do usuário que realizará o logout.
 */
export const logout = createAction(
  '[Auth] Logout',
  props<{ userId: string }>()
);

/**
 * Ação disparada quando o logout é bem-sucedido.
 */
export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

/**
 * Ação disparada quando o logout falha.
 */
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);

/**
 * Ação para iniciar a renovação de token (refresh token).
 * Recebe o ID do usuário.
 */
export const refreshToken = createAction(
  '[Auth] Refresh Token',
  props<{ userId: string }>()
);

/**
 * Ação disparada quando a renovação de token é bem-sucedida.
 * Recebe o novo token.
 */
export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ newToken: string }>()
);

/**
 * Ação disparada quando a renovação de token falha.
 */
export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: any }>()
);

/**
 * Ação para checar se um token ainda é válido.
 * Recebe o token.
 */
export const checkToken = createAction(
  '[Auth] Check Token',
  props<{ token: string }>()
);

/**
 * Ação disparada quando a checagem de token é bem-sucedida.
 * Indica se o token é válido.
 */
export const checkTokenSuccess = createAction(
  '[Auth] Check Token Success',
  props<{ valid: boolean }>()
);

/**
 * Ação disparada quando a checagem de token falha.
 */
export const checkTokenFailure = createAction(
  '[Auth] Check Token Failure',
  props<{ error: any }>()
);
