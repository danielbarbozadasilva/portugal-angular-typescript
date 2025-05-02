import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IResponseError } from '@app/core/models/models.index';

export interface AuthState {
  loading: boolean;
  token: string | null;
  user: any;
  error: IResponseError | string | null;
  registered: boolean;
  recoverySuccess: boolean;
}

const initialState: AuthState = {
  loading: false,
  token: null,
  user: null,
  error: null,
  registered: false,
  recoverySuccess: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signIn, s => ({ ...s, loading: true, error: null })),
  on(AuthActions.signInSuccess, (s, { response }) => {
    const token = response?.data?.token || null;
    const user = response?.data || null;
    if (token) localStorage.setItem('authToken', token);
    if (user) localStorage.setItem('authUser', JSON.stringify(user));
    return { ...s, loading: false, token, user, registered: !!token };
  }),
  on(AuthActions.signInFailure, (s, { error }) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    return { ...s, loading: false, error, token: null, user: null, registered: false };
  }),
  on(AuthActions.logout, s => ({ ...s, loading: true })),
  on(AuthActions.logoutSuccess, () => ({ ...initialState })),
  on(AuthActions.logoutFailure, (s, { error }) => ({ ...s, loading: false, error })),
  on(AuthActions.refreshToken, s => ({ ...s, loading: true })),
  on(AuthActions.refreshTokenSuccess, (s, { newToken }) => {
    if (newToken) localStorage.setItem('authToken', newToken);
    return { ...s, loading: false, token: newToken };
  }),
  on(AuthActions.refreshTokenFailure, (s, { error }) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    return { ...s, loading: false, error, token: null, user: null };
  }),
  on(AuthActions.checkToken, s => ({ ...s, loading: true })),
  on(AuthActions.checkTokenSuccess, (s, { valid, user }) => {
    if (!valid) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      return { ...s, loading: false, token: null, user: null };
    }
    if (user) localStorage.setItem('authUser', JSON.stringify(user));
    return { ...s, loading: false, user: user || s.user };
  }),
  on(AuthActions.checkTokenFailure, (s, { error }) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    return { ...s, loading: false, error, token: null, user: null };
  }),
  on(AuthActions.clearAuthError, s => ({ ...s, error: null })),
  on(AuthActions.recoveryPassword, s => ({ ...s, loading: true, recoverySuccess: false, error: null })),
  on(AuthActions.recoveryPasswordSuccess, s => ({ ...s, loading: false, recoverySuccess: true })),
  on(AuthActions.recoveryPasswordFailure, (s, { error }) => ({ ...s, loading: false, error, recoverySuccess: false }))
);
