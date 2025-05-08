import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.reducer';

export const selectGroupState = createFeatureSelector<GroupState>('group');
export const selectAllGroups = createSelector(selectGroupState, (state) => state.groups);
export const selectGroupLoading = createSelector(selectGroupState, (state) => state.loading);
export const selectGroupError = createSelector(selectGroupState, (state) => state.error);
