import { createAction, props } from '@ngrx/store';
import { IGroup } from '../../models/models.index';

export const loadGroups = createAction('[Group] Load Groups');
export const loadGroupsSuccess = createAction(
  '[Group] Load Groups Success',
  props<{ groups: IGroup[] }>()
);
export const loadGroupsFailure = createAction(
  '[Group] Load Groups Failure',
  props<{ error: any }>()
);

export const loadGroupById = createAction(
  '[Group] Load Group By ID',
  props<{ id: string }>()
);
export const loadGroupByIdSuccess = createAction(
  '[Group] Load Group By ID Success',
  props<{ group: IGroup }>()
);
export const loadGroupByIdFailure = createAction(
  '[Group] Load Group By ID Failure',
  props<{ error: any }>()
);

export const updateGroup = createAction(
  '[Group] Update Group',
  props<{ id: string; data: Partial<IGroup> }>()
);
export const updateGroupSuccess = createAction('[Group] Update Group Success');
export const updateGroupFailure = createAction(
  '[Group] Update Group Failure',
  props<{ error: any }>()
);

export const removeGroup = createAction(
  '[Group] Remove Group',
  props<{ id: string }>()
);
export const removeGroupSuccess = createAction('[Group] Remove Group Success');
export const removeGroupFailure = createAction(
  '[Group] Remove Group Failure',
  props<{ error: any }>()
);
