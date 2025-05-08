import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from './client.reducer';

// Selector para obter todo o estado de cliente
export const selectClientState = createFeatureSelector<ClientState>('client');

// Selector para o cliente cadastrado (objeto Client ou null)
export const selectClient = createSelector(selectClientState, (state) => state.client);

// Selector para o status de carregamento (loading) do cadastro
export const selectClientLoading = createSelector(selectClientState, (state) => state.loading);

// Selector para a mensagem de erro (se houver) do cadastro
export const selectClientError = createSelector(selectClientState, (state) => state.error);
