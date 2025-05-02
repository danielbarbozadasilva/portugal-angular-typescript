import { createReducer, on } from '@ngrx/store';
import * as SolicitationActions from './solicitation.actions';
import { ISolicitation, IResponseError } from '../../models/models.index';

export interface SolicitationState {
  loading: boolean;
  all: ISolicitation[];
  selected: ISolicitation | null;
  error: IResponseError | string | null;
}

const initialState: SolicitationState = {
  loading: false,
  all: [],
  selected: null,
  error: null,
};

export const solicitationReducer = createReducer(
  initialState,

  on(SolicitationActions.loadAllSolicitations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SolicitationActions.loadAllSolicitationsSuccess, (state, { solicitations }) => ({
    ...state,
    loading: false,
    all: solicitations,
  })),
  on(SolicitationActions.loadAllSolicitationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(SolicitationActions.loadSolicitationById, (state) => ({
    ...state,
    loading: true,
    selected: null,
    error: null,
  })),
  on(SolicitationActions.loadSolicitationByIdSuccess, (state, { solicitation }) => ({
    ...state,
    loading: false,
    selected: solicitation,
  })),
  on(SolicitationActions.loadSolicitationByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(SolicitationActions.updateSolicitation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SolicitationActions.updateSolicitationSuccess, (state, { solicitation }) => ({
    ...state,
    loading: false,
    all: state.all.map((s) => (s._id === solicitation._id ? solicitation : s)),
    selected: state.selected?._id === solicitation._id ? solicitation : state.selected,
  })),
  on(SolicitationActions.updateSolicitationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(SolicitationActions.removeSolicitation, (state, { id }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SolicitationActions.removeSolicitationSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    all: state.all.filter((s) => s._id !== id),
    selected: state.selected?._id === id ? null : state.selected,
  })),
  on(SolicitationActions.removeSolicitationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(SolicitationActions.clearSolicitationError, (state) => ({
    ...state,
    error: null,
  }))
);
