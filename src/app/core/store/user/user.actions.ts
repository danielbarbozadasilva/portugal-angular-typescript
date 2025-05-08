import { createAction, props } from '@ngrx/store';
import { IUser, IResponseError } from '../../models/models.index';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: IUser[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: IResponseError }>());
