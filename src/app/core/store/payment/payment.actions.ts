import { createAction, props } from '@ngrx/store';
import { IPayment } from '../../models/models.index';

export const loadPayments = createAction('[Payment] Load Payments');
export const loadPaymentsSuccess = createAction(
  '[Payment] Load Payments Success',
  props<{ payments: IPayment[] }>()
);
export const loadPaymentsFailure = createAction(
  '[Payment] Load Payments Failure',
  props<{ error: any }>()
);

export const loadPaymentById = createAction(
  '[Payment] Load Payment By ID',
  props<{ id: string }>()
);
export const loadPaymentByIdSuccess = createAction(
  '[Payment] Load Payment By ID Success',
  props<{ payment: IPayment }>()
);
export const loadPaymentByIdFailure = createAction(
  '[Payment] Load Payment By ID Failure',
  props<{ error: any }>()
);

export const updatePayment = createAction(
  '[Payment] Update Payment',
  props<{ id: string; data: Partial<IPayment> }>()
);
export const updatePaymentSuccess = createAction('[Payment] Update Payment Success');
export const updatePaymentFailure = createAction(
  '[Payment] Update Payment Failure',
  props<{ error: any }>()
);

export const removePayment = createAction(
  '[Payment] Remove Payment',
  props<{ id: string }>()
);
export const removePaymentSuccess = createAction('[Payment] Remove Payment Success');
export const removePaymentFailure = createAction(
  '[Payment] Remove Payment Failure',
  props<{ error: any }>()
);
