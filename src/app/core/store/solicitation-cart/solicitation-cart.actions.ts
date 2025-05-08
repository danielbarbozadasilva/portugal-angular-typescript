import { createAction, props } from '@ngrx/store';
import { ISolicitationCartItem, IResponseError } from '../../models/models.index';

export const loadAllSolicitationCartItems = createAction('[SolicitationCart] Load All');
export const loadAllSolicitationCartItemsSuccess = createAction(
  '[SolicitationCart] Load All Success',
  props<{ items: ISolicitationCartItem[] }>()
);
export const loadAllSolicitationCartItemsFailure = createAction(
  '[SolicitationCart] Load All Failure',
  props<{ error: IResponseError }>()
);

export const loadSolicitationCartItemById = createAction('[SolicitationCart] Load By ID', props<{ id: string }>());
export const loadSolicitationCartItemByIdSuccess = createAction(
  '[SolicitationCart] Load By ID Success',
  props<{ item: ISolicitationCartItem }>()
);
export const loadSolicitationCartItemByIdFailure = createAction(
  '[SolicitationCart] Load By ID Failure',
  props<{ error: IResponseError }>()
);

export const addSolicitationCartItem = createAction(
  '[SolicitationCart] Add Item',
  props<{ item: Partial<ISolicitationCartItem> }>()
);
export const addSolicitationCartItemSuccess = createAction(
  '[SolicitationCart] Add Item Success',
  props<{ item: ISolicitationCartItem }>()
);
export const addSolicitationCartItemFailure = createAction(
  '[SolicitationCart] Add Item Failure',
  props<{ error: IResponseError }>()
);

export const updateSolicitationCartItem = createAction(
  '[SolicitationCart] Update Item',
  props<{ id: string; data: Partial<ISolicitationCartItem> }>()
);
export const updateSolicitationCartItemSuccess = createAction(
  '[SolicitationCart] Update Item Success',
  props<{ item: ISolicitationCartItem }>()
);
export const updateSolicitationCartItemFailure = createAction(
  '[SolicitationCart] Update Item Failure',
  props<{ error: IResponseError }>()
);

export const removeSolicitationCartItem = createAction('[SolicitationCart] Remove Item', props<{ id: string }>());
export const removeSolicitationCartItemSuccess = createAction(
  '[SolicitationCart] Remove Item Success',
  props<{ id: string }>()
);
export const removeSolicitationCartItemFailure = createAction(
  '[SolicitationCart] Remove Item Failure',
  props<{ error: IResponseError }>()
);

export const clearSolicitationCart = createAction('[SolicitationCart] Clear Cart');
export const clearSolicitationCartSuccess = createAction('[SolicitationCart] Clear Cart Success');
export const clearSolicitationCartFailure = createAction(
  '[SolicitationCart] Clear Cart Failure',
  props<{ error: IResponseError }>()
);
