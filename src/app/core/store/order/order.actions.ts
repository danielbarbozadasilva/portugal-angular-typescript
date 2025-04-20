import { createAction, props } from '@ngrx/store';
import { IOrder } from '../../models/models.index';

export const loadOrders = createAction('[Order] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: IOrder[] }>()
);
export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);

export const loadOrderById = createAction(
  '[Order] Load Order By ID',
  props<{ id: string }>()
);
export const loadOrderByIdSuccess = createAction(
  '[Order] Load Order By ID Success',
  props<{ order: IOrder }>()
);
export const loadOrderByIdFailure = createAction(
  '[Order] Load Order By ID Failure',
  props<{ error: any }>()
);

export const updateOrder = createAction(
  '[Order] Update Order',
  props<{ id: string; data: Partial<IOrder> }>()
);
export const updateOrderSuccess = createAction('[Order] Update Order Success');
export const updateOrderFailure = createAction(
  '[Order] Update Order Failure',
  props<{ error: any }>()
);

export const removeOrder = createAction(
  '[Order] Remove Order',
  props<{ id: string }>()
);
export const removeOrderSuccess = createAction('[Order] Remove Order Success');
export const removeOrderFailure = createAction(
  '[Order] Remove Order Failure',
  props<{ error: any }>()
);
