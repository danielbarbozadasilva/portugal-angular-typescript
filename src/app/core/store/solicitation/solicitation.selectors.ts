import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SolicitationState } from './solicitation.reducer';

// Feature selector for the solicitation state slice
export const selectSolicitationState = createFeatureSelector<SolicitationState>('solicitation');

// Selector for the loading status
export const selectSolicitationLoading = createSelector(
  selectSolicitationState,
  (state: SolicitationState) => state.loading
);

// Selector for all solicitations
export const selectAllSolicitations = createSelector(selectSolicitationState, (state: SolicitationState) => state.all);

// Selector for the currently selected solicitation
export const selectSelectedSolicitation = createSelector(
  selectSolicitationState,
  (state: SolicitationState) => state.selected
);

// Selector for any error messages
export const selectSolicitationError = createSelector(
  selectSolicitationState,
  (state: SolicitationState) => state.error
);
