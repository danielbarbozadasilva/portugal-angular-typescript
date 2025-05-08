import { createAction, props } from '@ngrx/store';
import { IGroup } from '../../models/models.group';

export const loadGroups = createAction('[Group] Load Groups');
export const loadGroupsSuccess = createAction('[Group] Load Groups Success', props<{ groups: IGroup[] }>());
export const loadGroupsFailure = createAction('[Group] Load Groups Failure', props<{ error: any }>());
