import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SolicitationState } from './solicitation.reducer';

export const selectSolicitationState = createFeatureSelector<SolicitationState>('solicitation');

export const selectSolicitationLoading = createSelector(
  selectSolicitationState,
  (state) => state.loading
);

export const selectAllSolicitations = createSelector(
  selectSolicitationState,
  (state) => state.all
);

export const selectSelectedSolicitation = createSelector(
  selectSolicitationState,
  (state) => state.selected
);

export const selectSolicitationError = createSelector(
  selectSolicitationState,
  (state) => state.error
);
