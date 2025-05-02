import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsAuthenticated = createSelector(
  selectAuthToken,
  (token: string | null) => !!token
);

export const selectIsRegistered = createSelector(
  selectAuthState,
  (state: AuthState) => state.registered
);

export const selectAuthStatus = createSelector(
  selectIsAuthenticated,
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
  (isAuthenticated, user, loading, error) => ({
    isAuthenticated,
    user,
    loading,
    error
  })
);

export const selectRecoverySuccess = createSelector(
  selectAuthState,
  (state: AuthState) => state.recoverySuccess
);
