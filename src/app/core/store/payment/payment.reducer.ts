import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { IPayment, IResponseError } from '../../models/models.index';

export interface PaymentState {
  loading: boolean;
  all: IPayment[];
  selected: IPayment | null;
  error: IResponseError | string | null;
}

const initialState: PaymentState = {
  loading: false,
  all: [],
  selected: null,
  error: null,
};

export const paymentReducer = createReducer(
  initialState,

  on(PaymentActions.loadPayments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentActions.loadPaymentsSuccess, (state, { payments }) => ({
    ...state,
    loading: false,
    all: payments,
  })),
  on(PaymentActions.loadPaymentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(PaymentActions.loadPaymentById, (state) => ({
    ...state,
    loading: true,
    selected: null,
    error: null,
  })),
  on(PaymentActions.loadPaymentByIdSuccess, (state, { payment }) => ({
    ...state,
    loading: false,
    selected: payment,
  })),
  on(PaymentActions.loadPaymentByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(PaymentActions.updatePayment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentActions.updatePaymentSuccess, (state, { payment }) => ({
    ...state,
    loading: false,
    all: state.all.map((p) => (p._id === payment._id ? payment : p)),
    selected: state.selected?._id === payment._id ? payment : state.selected,
  })),
  on(PaymentActions.updatePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(PaymentActions.removePayment, (state, { id }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentActions.removePaymentSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    all: state.all.filter((p) => p._id !== id),
    selected: state.selected?._id === id ? null : state.selected,
  })),
  on(PaymentActions.removePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(PaymentActions.clearPaymentError, (state) => ({
    ...state,
    error: null,
  }))
);
