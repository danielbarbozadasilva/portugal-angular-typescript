import { createAction, props } from '@ngrx/store';
import { IOrder, IResponseError } from '../../models/models.index';

export const loadOrders = createAction('[Order] Load Orders');
export const loadOrdersSuccess = createAction('[Order] Load Orders Success', props<{ orders: IOrder[] }>());
export const loadOrdersFailure = createAction('[Order] Load Orders Failure', props<{ error: IResponseError }>());

export const loadOrderById = createAction('[Order] Load Order By ID', props<{ id: string }>());
export const loadOrderByIdSuccess = createAction('[Order] Load Order By ID Success', props<{ order: IOrder }>());
export const loadOrderByIdFailure = createAction(
  '[Order] Load Order By ID Failure',
  props<{ error: IResponseError }>()
);

export const createOrder = createAction('[Order] Create Order', props<{ data: Partial<IOrder> }>());
export const createOrderSuccess = createAction('[Order] Create Order Success', props<{ order: IOrder }>());
export const createOrderFailure = createAction('[Order] Create Order Failure', props<{ error: IResponseError }>());

export const updateOrder = createAction('[Order] Update Order', props<{ id: string; data: Partial<IOrder> }>());
export const updateOrderSuccess = createAction('[Order] Update Order Success', props<{ order: IOrder }>());
export const updateOrderFailure = createAction('[Order] Update Order Failure', props<{ error: IResponseError }>());

export const removeOrder = createAction('[Order] Remove Order', props<{ id: string }>());
export const removeOrderSuccess = createAction('[Order] Remove Order Success', props<{ id: string }>());
export const removeOrderFailure = createAction('[Order] Remove Order Failure', props<{ error: IResponseError }>());
