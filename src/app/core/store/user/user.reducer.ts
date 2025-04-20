import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { IUser } from '../../models/models.index';

export interface UserState {
  loading: boolean;
  all: IUser[];
  selected?: IUser;
  error?: string;
}

const initialState: UserState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadAllUsers, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadAllUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    all: users
  })),
  on(UserActions.loadAllUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.loadUserById, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    selected: user
  })),
  on(UserActions.loadUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.updateUserSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.removeUser, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.removeUserSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(UserActions.removeUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
