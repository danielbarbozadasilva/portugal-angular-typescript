import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IAuthResponse } from '../../models/user.model';

export interface AuthState {
  loading: boolean;
  token: string | null;
  user: any; // aqui poderia usar a interface de usuário
  error: string | null;
  registered: boolean;
}

const initialState: AuthState = {
  loading: false,
  token: null,
  user: null,
  error: null,
  registered: false
};

export const authReducer = createReducer(
  initialState,

  // SignIn
  on(AuthActions.signIn, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.signInSuccess, (state, { response }) => {
    let newToken = '';
    let userData: any = null;
    if (response && response.data) {
      newToken = response.data.token;
      userData = response.data;
    }

    return {
      ...state,
      loading: false,
      token: newToken,
      user: userData,
      error: null,
      registered: true
    };
  }),
  on(AuthActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    registered: false
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    loading: false,
    token: null,
    user: null,
    error: null,
    registered: false
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Refresh Token
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.refreshTokenSuccess, (state, { newToken }) => ({
    ...state,
    loading: false,
    token: newToken
  })),
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Check Token
  on(AuthActions.checkToken, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.checkTokenSuccess, (state, { valid }) => ({
    ...state,
    loading: false,
    error: valid ? null : 'Token inválido ou expirado'
  })),
  on(AuthActions.checkTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
