import { createReducer, on } from '@ngrx/store';
import { loadGroups, loadGroupsSuccess, loadGroupsFailure } from './group.actions';
import { IGroup } from '../../models/models.group';

export interface GroupState {
  groups: IGroup[];
  loading: boolean;
  error: any;
}

export const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export const groupReducer = createReducer(
  initialState,
  on(loadGroups, (state) => ({ ...state, loading: true, error: null })),
  on(loadGroupsSuccess, (state, { groups }) => ({ ...state, groups, loading: false })),
  on(loadGroupsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
