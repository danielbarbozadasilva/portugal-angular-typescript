import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from './payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const selectPaymentLoading = createSelector(
  selectPaymentState,
  (state) => state.loading
);

export const selectAllPayments = createSelector(
  selectPaymentState,
  (state) => state.all
);

export const selectSelectedPayment = createSelector(
  selectPaymentState,
  (state) => state.selected
);

export const selectPaymentError = createSelector(
  selectPaymentState,
  (state) => state.error
);
