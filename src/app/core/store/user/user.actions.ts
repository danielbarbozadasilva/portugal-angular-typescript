import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/models.index';

export const loadAllUsers = createAction('[User] Load All');
export const loadAllUsersSuccess = createAction(
  '[User] Load All Success',
  props<{ users: IUser[] }>()
);
export const loadAllUsersFailure = createAction(
  '[User] Load All Failure',
  props<{ error: any }>()
);

export const loadUserById = createAction(
  '[User] Load By ID',
  props<{ id: string }>()
);
export const loadUserByIdSuccess = createAction(
  '[User] Load By ID Success',
  props<{ user: IUser }>()
);
export const loadUserByIdFailure = createAction(
  '[User] Load By ID Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update',
  props<{ id: string; data: Partial<IUser> }>()
);
export const updateUserSuccess = createAction('[User] Update Success');
export const updateUserFailure = createAction(
  '[User] Update Failure',
  props<{ error: any }>()
);

export const removeUser = createAction(
  '[User] Remove',
  props<{ id: string }>()
);
export const removeUserSuccess = createAction('[User] Remove Success');
export const removeUserFailure = createAction(
  '[User] Remove Failure',
  props<{ error: any }>()
);
