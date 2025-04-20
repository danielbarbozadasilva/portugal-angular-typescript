import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.all
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selected
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);
