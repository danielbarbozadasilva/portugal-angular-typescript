/**
 * @file activity.selectors.ts
 * @description Define seletores para obter partes específicas do estado de Activity.
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>('activity');

export const selectActivityLoading = createSelector(
  selectActivityState,
  (state) => state.loading
);

export const selectAllActivities = createSelector(
  selectActivityState,
  (state) => state.all
);

export const selectSelectedActivity = createSelector(
  selectActivityState,
  (state) => state.selected
);

export const selectActivityError = createSelector(
  selectActivityState,
  (state) => state.error
);
