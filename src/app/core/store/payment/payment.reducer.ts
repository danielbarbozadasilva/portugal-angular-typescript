import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { IPayment } from '../../models/models.index';

export interface PaymentState {
  loading: boolean;
  all: IPayment[];
  selected?: IPayment;
  error?: string;
}

const initialState: PaymentState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const paymentReducer = createReducer(
  initialState,

  on(PaymentActions.loadPayments, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentActions.loadPaymentsSuccess, (state, { payments }) => ({
    ...state,
    loading: false,
    all: payments
  })),
  on(PaymentActions.loadPaymentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PaymentActions.loadPaymentById, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentActions.loadPaymentByIdSuccess, (state, { payment }) => ({
    ...state,
    loading: false,
    selected: payment
  })),
  on(PaymentActions.loadPaymentByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PaymentActions.updatePayment, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentActions.updatePaymentSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(PaymentActions.updatePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PaymentActions.removePayment, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentActions.removePaymentSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(PaymentActions.removePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
