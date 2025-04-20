import { createReducer, on } from '@ngrx/store';
import * as SolicitationActions from './solicitation.actions';
import { ISolicitation } from '../../models/models.index';

export interface SolicitationState {
  loading: boolean;
  all: ISolicitation[];
  selected?: ISolicitation;
  error?: string;
}

const initialState: SolicitationState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const solicitationReducer = createReducer(
  initialState,

  on(SolicitationActions.loadAllSolicitations, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationActions.loadAllSolicitationsSuccess, (state, { solicitations }) => ({
    ...state,
    loading: false,
    all: solicitations
  })),
  on(SolicitationActions.loadAllSolicitationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SolicitationActions.loadSolicitationById, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationActions.loadSolicitationByIdSuccess, (state, { solicitation }) => ({
    ...state,
    loading: false,
    selected: solicitation
  })),
  on(SolicitationActions.loadSolicitationByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SolicitationActions.updateSolicitation, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationActions.updateSolicitationSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(SolicitationActions.updateSolicitationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(SolicitationActions.removeSolicitation, (state) => ({
    ...state,
    loading: true
  })),
  on(SolicitationActions.removeSolicitationSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(SolicitationActions.removeSolicitationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
