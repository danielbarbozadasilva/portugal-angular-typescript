import { createReducer, on } from '@ngrx/store';
import * as SolicitationCartActions from './solicitation-cart.actions';
import { ISolicitationCartItem, IResponseError } from '../../models/models.index';

export interface SolicitationCartState {
  loading: boolean;
  all: ISolicitationCartItem[];
  selected?: ISolicitationCartItem;
  error?: IResponseError;
}

const initialState: SolicitationCartState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined,
};

export const solicitationCartReducer = createReducer(
  initialState,

  on(
    SolicitationCartActions.loadAllSolicitationCartItems,
    SolicitationCartActions.loadSolicitationCartItemById,
    SolicitationCartActions.addSolicitationCartItem,
    SolicitationCartActions.updateSolicitationCartItem,
    SolicitationCartActions.removeSolicitationCartItem,
    SolicitationCartActions.clearSolicitationCart,
    (state) => ({
      ...state,
      loading: true,
      error: undefined,
    })
  ),

  on(SolicitationCartActions.loadAllSolicitationCartItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    all: items,
  })),

  on(SolicitationCartActions.loadSolicitationCartItemByIdSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    selected: item,
  })),

  on(SolicitationCartActions.addSolicitationCartItemSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    all: [...state.all, item],
  })),

  on(SolicitationCartActions.updateSolicitationCartItemSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    all: state.all.map((i) => (i._id === item._id ? item : i)),
    selected: state.selected?._id === item._id ? item : state.selected,
  })),

  on(SolicitationCartActions.removeSolicitationCartItemSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    all: state.all.filter((i) => i._id !== id),
    selected: state.selected?._id === id ? undefined : state.selected,
  })),

  on(SolicitationCartActions.clearSolicitationCartSuccess, (state) => ({
    ...state,
    loading: false,
    all: [],
    selected: undefined,
  })),

  on(
    SolicitationCartActions.loadAllSolicitationCartItemsFailure,
    SolicitationCartActions.loadSolicitationCartItemByIdFailure,
    SolicitationCartActions.addSolicitationCartItemFailure,
    SolicitationCartActions.updateSolicitationCartItemFailure,
    SolicitationCartActions.removeSolicitationCartItemFailure,
    SolicitationCartActions.clearSolicitationCartFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);
