import { createReducer, on } from '@ngrx/store';
import * as GroupActions from './group.actions';
import { IGroup } from '../../models/models.index';

export interface GroupState {
  loading: boolean;
  all: IGroup[];
  selected?: IGroup;
  error?: string;
}

const initialState: GroupState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const groupReducer = createReducer(
  initialState,

  on(GroupActions.loadGroups, (state) => ({
    ...state,
    loading: true
  })),
  on(GroupActions.loadGroupsSuccess, (state, { groups }) => ({
    ...state,
    loading: false,
    all: groups
  })),
  on(GroupActions.loadGroupsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(GroupActions.loadGroupById, (state) => ({
    ...state,
    loading: true
  })),
  on(GroupActions.loadGroupByIdSuccess, (state, { group }) => ({
    ...state,
    loading: false,
    selected: group
  })),
  on(GroupActions.loadGroupByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(GroupActions.updateGroup, (state) => ({
    ...state,
    loading: true
  })),
  on(GroupActions.updateGroupSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(GroupActions.updateGroupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(GroupActions.removeGroup, (state) => ({
    ...state,
    loading: true
  })),
  on(GroupActions.removeGroupSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(GroupActions.removeGroupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
