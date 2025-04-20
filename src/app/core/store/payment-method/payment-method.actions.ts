import { createAction, props } from '@ngrx/store';
import { IPaymentMethod } from '../../models/models.index';

export const loadPaymentMethods = createAction('[PaymentMethod] Load PaymentMethods');
export const loadPaymentMethodsSuccess = createAction(
  '[PaymentMethod] Load PaymentMethods Success',
  props<{ methods: IPaymentMethod[] }>()
);
export const loadPaymentMethodsFailure = createAction(
  '[PaymentMethod] Load PaymentMethods Failure',
  props<{ error: any }>()
);

export const loadPaymentMethodById = createAction(
  '[PaymentMethod] Load PaymentMethod By ID',
  props<{ id: string }>()
);
export const loadPaymentMethodByIdSuccess = createAction(
  '[PaymentMethod] Load PaymentMethod By ID Success',
  props<{ method: IPaymentMethod }>()
);
export const loadPaymentMethodByIdFailure = createAction(
  '[PaymentMethod] Load PaymentMethod By ID Failure',
  props<{ error: any }>()
);

export const updatePaymentMethod = createAction(
  '[PaymentMethod] Update PaymentMethod',
  props<{ id: string; data: Partial<IPaymentMethod> }>()
);
export const updatePaymentMethodSuccess = createAction('[PaymentMethod] Update PaymentMethod Success');
export const updatePaymentMethodFailure = createAction(
  '[PaymentMethod] Update PaymentMethod Failure',
  props<{ error: any }>()
);

export const removePaymentMethod = createAction(
  '[PaymentMethod] Remove PaymentMethod',
  props<{ id: string }>()
);
export const removePaymentMethodSuccess = createAction('[PaymentMethod] Remove PaymentMethod Success');
export const removePaymentMethodFailure = createAction(
  '[PaymentMethod] Remove PaymentMethod Failure',
  props<{ error: any }>()
);
