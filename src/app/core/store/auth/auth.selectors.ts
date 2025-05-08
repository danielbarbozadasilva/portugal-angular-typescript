import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { IAuthStatus, IUser } from '../../../core/models/models.user';

export class AuthSelectors {
  private constructor() {}

  public static get authState(): MemoizedSelector<object, AuthState> {
    return createFeatureSelector<AuthState>('auth');
  }

  public static get loading(): MemoizedSelector<object, boolean> {
    return createSelector(
      AuthSelectors.authState,
      (state: AuthState) => state.loading
    );
  }

  public static get token(): MemoizedSelector<object, string | null> {
    return createSelector(AuthSelectors.authState, (state: AuthState) => state.token);
  }

  public static get user(): MemoizedSelector<object, IUser | null> {
    return createSelector(AuthSelectors.authState, (state: AuthState) => state.user);
  }

  public static get error(): MemoizedSelector<object, any> {
    return createSelector(AuthSelectors.authState, (state: AuthState) => state.error);
  }

  public static get isRegistered(): MemoizedSelector<object, boolean> {
    return createSelector(AuthSelectors.authState, (state: AuthState) => state.registered);
  }

  public static get recoverySuccess(): MemoizedSelector<object, boolean> {
    return createSelector(AuthSelectors.authState, (state: AuthState) => state.recoverySuccess);
  }

  public static get isAuthenticated(): MemoizedSelector<object, boolean> {
    return createSelector(
      AuthSelectors.token,
      (token: string | null) => !!token
    );
  }

  public static get authStatus(): MemoizedSelector<object, IAuthStatus> {
    return createSelector(
      AuthSelectors.isAuthenticated,
      AuthSelectors.user,
      AuthSelectors.loading,
      AuthSelectors.error,
      (isAuthenticated: boolean, user: IUser | null, loading: boolean, error: any): IAuthStatus => ({
        isAuthenticated,
        user,
        loading,
        error,
      })
    );
  }
}
