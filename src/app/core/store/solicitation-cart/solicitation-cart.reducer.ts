import { createReducer, on } from '@ngrx/store';
import * as SolicitationCartActions from './solicitation-cart.actions';
import { ISolicitationCartItem } from '../../models/models.index';

export interface SolicitationCartState {
  loading: boolean;
  all: ISolicitationCartItem[];
  selected?: ISolicitationCartItem;
  error?: string;
}

const initialState: SolicitationCartState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const solicitationCartReducer = createReducer(
  initialState,

  on(SolicitationCartActions.loadAllSolicitationCartItems, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationCartActions.loadAllSolicitationCartItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    all: items
  })),
  on(SolicitationCartActions.loadAllSolicitationCartItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SolicitationCartActions.loadSolicitationCartItemById, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationCartActions.loadSolicitationCartItemByIdSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    selected: item
  })),
  on(SolicitationCartActions.loadSolicitationCartItemByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SolicitationCartActions.updateSolicitationCartItem, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationCartActions.updateSolicitationCartItemSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(SolicitationCartActions.updateSolicitationCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SolicitationCartActions.removeSolicitationCartItem, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationCartActions.removeSolicitationCartItemSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(SolicitationCartActions.removeSolicitationCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
