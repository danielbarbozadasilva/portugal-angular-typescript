import { createAction, props } from '@ngrx/store';
import { ISolicitationCartItem } from '../../models/models.index';

export const loadAllSolicitationCartItems = createAction('[SolicitationCart] Load All');
export const loadAllSolicitationCartItemsSuccess = createAction(
  '[SolicitationCart] Load All Success',
  props<{ items: ISolicitationCartItem[] }>()
);
export const loadAllSolicitationCartItemsFailure = createAction(
  '[SolicitationCart] Load All Failure',
  props<{ error: any }>()
);

export const loadSolicitationCartItemById = createAction(
  '[SolicitationCart] Load By ID',
  props<{ id: string }>()
);
export const loadSolicitationCartItemByIdSuccess = createAction(
  '[SolicitationCart] Load By ID Success',
  props<{ item: ISolicitationCartItem }>()
);
export const loadSolicitationCartItemByIdFailure = createAction(
  '[SolicitationCart] Load By ID Failure',
  props<{ error: any }>()
);

export const updateSolicitationCartItem = createAction(
  '[SolicitationCart] Update',
  props<{ id: string; data: Partial<ISolicitationCartItem> }>()
);
export const updateSolicitationCartItemSuccess = createAction('[SolicitationCart] Update Success');
export const updateSolicitationCartItemFailure = createAction(
  '[SolicitationCart] Update Failure',
  props<{ error: any }>()
);

export const removeSolicitationCartItem = createAction(
  '[SolicitationCart] Remove',
  props<{ id: string }>()
);
export const removeSolicitationCartItemSuccess = createAction('[SolicitationCart] Remove Success');
export const removeSolicitationCartItemFailure = createAction(
  '[SolicitationCart] Remove Failure',
  props<{ error: any }>()
);
