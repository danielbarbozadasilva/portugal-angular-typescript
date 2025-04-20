import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.reducer';

export const selectGroupState = createFeatureSelector<GroupState>('group');

export const selectGroupLoading = createSelector(
  selectGroupState,
  (state) => state.loading
);

export const selectAllGroups = createSelector(
  selectGroupState,
  (state) => state.all
);

export const selectSelectedGroup = createSelector(
  selectGroupState,
  (state) => state.selected
);

export const selectGroupError = createSelector(
  selectGroupState,
  (state) => state.error
);
