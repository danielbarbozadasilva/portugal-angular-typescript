import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentMethodState } from './payment-method.reducer';

export const selectPaymentMethodState = createFeatureSelector<PaymentMethodState>('paymentMethod');

export const selectPaymentMethodLoading = createSelector(
  selectPaymentMethodState,
  (state) => state.loading
);

export const selectAllPaymentMethods = createSelector(
  selectPaymentMethodState,
  (state) => state.all
);

export const selectSelectedPaymentMethod = createSelector(
  selectPaymentMethodState,
  (state) => state.selected
);

export const selectPaymentMethodError = createSelector(
  selectPaymentMethodState,
  (state) => state.error
);
