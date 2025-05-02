import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { IOrder, IResponseError } from '../../models/models.index';

export interface OrderState {
  loading: boolean;
  all: IOrder[];
  selected?: IOrder;
  error?: IResponseError;
}

const initialState: OrderState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined,
};

export const orderReducer = createReducer(
  initialState,

  on(
    OrderActions.loadOrders,
    OrderActions.loadOrderById,
    OrderActions.createOrder,
    OrderActions.updateOrder,
    OrderActions.removeOrder,
    (state) => ({
      ...state,
      loading: true,
      error: undefined,
    })
  ),

  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    all: orders,
  })),

  on(OrderActions.loadOrderByIdSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    selected: order,
  })),

  on(OrderActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    all: [...state.all, order],
  })),

  on(OrderActions.updateOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    all: state.all.map((o) => (o._id === order._id ? order : o)),
    selected: state.selected?._id === order._id ? order : state.selected,
  })),

  on(OrderActions.removeOrderSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    all: state.all.filter((o) => o._id !== id),
    selected: state.selected?._id === id ? undefined : state.selected,
  })),

  on(
    OrderActions.loadOrdersFailure,
    OrderActions.loadOrderByIdFailure,
    OrderActions.createOrderFailure,
    OrderActions.updateOrderFailure,
    OrderActions.removeOrderFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);
