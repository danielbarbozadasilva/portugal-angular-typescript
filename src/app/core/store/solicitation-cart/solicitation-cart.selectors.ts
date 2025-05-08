import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SolicitationCartState } from './solicitation-cart.reducer';

export const selectSolicitationCartState = createFeatureSelector<SolicitationCartState>('solicitationCart');

export const selectSolicitationCartLoading = createSelector(
  selectSolicitationCartState,
  (state) => state.loading
);

export const selectAllSolicitationCartItems = createSelector(
  selectSolicitationCartState,
  (state) => state.all
);

export const selectSelectedSolicitationCartItem = createSelector(
  selectSolicitationCartState,
  (state) => state.selected
);

export const selectSolicitationCartError = createSelector(
  selectSolicitationCartState,
  (state) => state.error
);
