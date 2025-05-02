import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from './activity.reducer';

export const selectActivityState = createFeatureSelector<ActivityState>('activity');
export const selectAllActivities = createSelector(selectActivityState, (state) => state.activities);
export const selectActivityCurrentPage = createSelector(selectActivityState, (state) => state.currentPage);
export const selectActivityTotalPages = createSelector(selectActivityState, (state) => state.totalPages);
export const selectActivityLoading = createSelector(selectActivityState, (state) => state.loading);
export const selectActivityError = createSelector(selectActivityState, (state) => state.error);
