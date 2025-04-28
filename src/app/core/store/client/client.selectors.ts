import { createFeatureSelector, createSelector } from '@ngrx/store';
import { clientFeatureKey, ClientState } from './client.reducer';

// Selector para obter todo o estado de cliente
export const selectClientState = createFeatureSelector<ClientState>(clientFeatureKey);

// Selector para o cliente cadastrado (objeto Client ou null)
export const selectClient = createSelector(
  selectClientState,
  (state: ClientState) => state.client
);

// Selector para o status de carregamento (loading) do cadastro
export const selectLoading = createSelector(
  selectClientState,
  (state: ClientState) => state.loading
);

// Selector para a mensagem de erro (se houver) do cadastro
export const selectError = createSelector(
  selectClientState,
  (state: ClientState) => state.error
);
