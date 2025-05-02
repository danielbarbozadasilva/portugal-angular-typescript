import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from './payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const selectAllPayments = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.all
);

export const selectSelectedPayment = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.selected
);

export const selectPaymentLoading = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.loading
);

export const selectPaymentError = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.error
);
