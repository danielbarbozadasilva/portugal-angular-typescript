/**
 * @file activity.actions.ts
 * @description Define as ações (Actions) para o gerenciamento de estado de Atividades no NgRx.
 */

import { createAction, props } from '@ngrx/store';
import { IActivity } from '../../models/models.activity';

/**
 * Ação para carregar atividades com filtros opcionais.
 * @param filters - Objeto que pode conter filtros (keyword, category, price range, etc).
 */
export const loadActivities = createAction(
  '[Activity] Load Activities',
  props<{ filters?: any }>()  // <-- adicionamos filters como opcional
);

export const loadActivitiesSuccess = createAction(
  '[Activity] Load Activities Success',
  props<{ activities: IActivity[] }>()
);

export const loadActivitiesFailure = createAction(
  '[Activity] Load Activities Failure',
  props<{ error: any }>()
);

export const loadActivityById = createAction(
  '[Activity] Load Activity By ID',
  props<{ id: string }>()
);

export const loadActivityByIdSuccess = createAction(
  '[Activity] Load Activity By ID Success',
  props<{ activity: IActivity }>()
);

export const loadActivityByIdFailure = createAction(
  '[Activity] Load Activity By ID Failure',
  props<{ error: any }>()
);

export const createActivity = createAction(
  '[Activity] Create Activity',
  props<{ activity: Partial<IActivity> }>()
);

export const createActivitySuccess = createAction(
  '[Activity] Create Activity Success'
);

export const createActivityFailure = createAction(
  '[Activity] Create Activity Failure',
  props<{ error: any }>()
);

export const updateActivity = createAction(
  '[Activity] Update Activity',
  props<{ id: string; data: Partial<IActivity> }>()
);

export const updateActivitySuccess = createAction(
  '[Activity] Update Activity Success'
);

export const updateActivityFailure = createAction(
  '[Activity] Update Activity Failure',
  props<{ error: any }>()
);

export const deleteActivity = createAction(
  '[Activity] Delete Activity',
  props<{ id: string }>()
);

export const deleteActivitySuccess = createAction(
  '[Activity] Delete Activity Success'
);

export const deleteActivityFailure = createAction(
  '[Activity] Delete Activity Failure',
  props<{ error: any }>()
);
