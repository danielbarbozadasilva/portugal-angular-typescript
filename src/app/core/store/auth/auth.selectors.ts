import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

/**
 * Cria um feature selector para o estado de 'auth'.
 * Certifique-se de que o nome 'auth' corresponde ao usado em StoreModule.forRoot({ auth: authReducer })
 * ou forFeature('auth', authReducer).
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * Retorna true/false indicando se há um token no estado (usuário logado).
 */
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => !!state.token
);

/**
 * Retorna o token atual (ou null).
 */
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

/**
 * Retorna se o carregamento (loading) está ativo.
 */
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

/**
 * Retorna a mensagem de erro (ou null).
 */
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

/**
 * Retorna o objeto de usuário atual (ou null).
 */
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);
