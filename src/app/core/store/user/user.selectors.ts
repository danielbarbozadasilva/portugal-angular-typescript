import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { IUser } from '../../models/models.index';

// Feature selector for the 'user' state slice
export const selectUserState = createFeatureSelector<UserState>('user'); // Ensure 'user' matches the key in reducers-map.ts

// Selector for the loading status
export const selectUserLoading = createSelector(selectUserState, (state: UserState): boolean => state.loading);

// Selector for all users
export const selectAllUsers = createSelector(selectUserState, (state: UserState): IUser[] => state.all);

// Selector for the currently selected user
export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState): IUser | undefined => state.selected
);

// Selector for any error message
export const selectUserError = createSelector(selectUserState, (state: UserState): string | undefined => state.error);

// Example: Selector to get a user by ID from the 'all' list
export const selectUserById = (userId: string) =>
  createSelector(selectAllUsers, (users: IUser[]): IUser | undefined => users.find((user) => user._id === userId));
