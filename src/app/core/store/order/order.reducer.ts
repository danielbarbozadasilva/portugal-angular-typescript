import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { IOrder } from '../../models/models.index';

export interface OrderState {
  loading: boolean;
  all: IOrder[];
  selected?: IOrder;
  error?: string;
}

const initialState: OrderState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const orderReducer = createReducer(
  initialState,

  on(OrderActions.loadOrders, (state) => ({
    ...state,
    loading: true
  })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    all: orders
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrderActions.loadOrderById, (state) => ({
    ...state,
    loading: true
  })),
  on(OrderActions.loadOrderByIdSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    selected: order
  })),
  on(OrderActions.loadOrderByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrderActions.updateOrder, (state) => ({
    ...state,
    loading: true
  })),
  on(OrderActions.updateOrderSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(OrderActions.updateOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrderActions.removeOrder, (state) => ({
    ...state,
    loading: true
  })),
  on(OrderActions.removeOrderSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(OrderActions.removeOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
