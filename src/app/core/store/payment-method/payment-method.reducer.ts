import { createReducer, on } from '@ngrx/store';
import * as PaymentMethodActions from './payment-method.actions';
import { IPaymentMethod } from '../../models/models.index';

export interface PaymentMethodState {
  loading: boolean;
  all: IPaymentMethod[];
  selected?: IPaymentMethod;
  error?: string;
}

const initialState: PaymentMethodState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const paymentMethodReducer = createReducer(
  initialState,

  on(PaymentMethodActions.loadPaymentMethods, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentMethodActions.loadPaymentMethodsSuccess, (state, { methods }) => ({
    ...state,
    loading: false,
    all: methods
  })),
  on(PaymentMethodActions.loadPaymentMethodsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PaymentMethodActions.loadPaymentMethodById, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentMethodActions.loadPaymentMethodByIdSuccess, (state, { method }) => ({
    ...state,
    loading: false,
    selected: method
  })),
  on(PaymentMethodActions.loadPaymentMethodByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PaymentMethodActions.updatePaymentMethod, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentMethodActions.updatePaymentMethodSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(PaymentMethodActions.updatePaymentMethodFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PaymentMethodActions.removePaymentMethod, (state) => ({
    ...state,
    loading: true
  })),
  on(PaymentMethodActions.removePaymentMethodSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(PaymentMethodActions.removePaymentMethodFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
