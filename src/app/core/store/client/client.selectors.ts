import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from './client.reducer';

export const selectClientState = createFeatureSelector<ClientState>('client');

export const selectClientLoading = createSelector(
  selectClientState,
  (state) => state.loading
);

export const selectAllClients = createSelector(
  selectClientState,
  (state) => state.all
);

export const selectSelectedClient = createSelector(
  selectClientState,
  (state) => state.selected
);

export const selectClientError = createSelector(
  selectClientState,
  (state) => state.error
);
