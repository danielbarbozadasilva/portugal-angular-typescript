import { createReducer, on } from '@ngrx/store';
import * as SolicitationActions from './solicitation.actions';
import { ISolicitation, IResponseError } from '../../models/models.index'; // Import IResponseError

export interface SolicitationState {
  loading: boolean;
  all: ISolicitation[];
  selected?: ISolicitation;
  error?: IResponseError | string; // Allow IResponseError or string
}

const initialState: SolicitationState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined,
};

export const solicitationReducer = createReducer(
  initialState,

  // Load All Solicitations
  on(SolicitationActions.loadAllSolicitations, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(SolicitationActions.loadAllSolicitationsSuccess, (state, { solicitations }) => ({
    ...state,
    loading: false,
    all: solicitations,
  })),
  on(SolicitationActions.loadAllSolicitationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to load solicitations', // Store error message or the object
  })),

  // Load Solicitation by ID
  on(SolicitationActions.loadSolicitationById, (state) => ({
    ...state,
    loading: true,
  })),
  on(SolicitationActions.loadSolicitationByIdSuccess, (state, { solicitation }) => ({
    ...state,
    loading: false,
    selected: solicitation,
  })),
  on(SolicitationActions.loadSolicitationByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to load solicitation by ID', // Store error message or the object
  })),

  // Update Solicitation
  on(SolicitationActions.updateSolicitation, (state) => ({
    ...state,
    loading: true,
  })),
  on(SolicitationActions.updateSolicitationSuccess, (state, { solicitation }) => ({
    ...state,
    loading: false,
    // Optionally update the 'all' array or 'selected' solicitation
    all: state.all.map((s) => (s._id === solicitation._id ? solicitation : s)),
    selected: state.selected?._id === solicitation._id ? solicitation : state.selected,
  })),
  on(SolicitationActions.updateSolicitationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to update solicitation', // Store error message or the object
  })),

  // Remove Solicitation
  on(SolicitationActions.removeSolicitation, (state) => ({
    ...state,
    loading: true,
  })),
  on(SolicitationActions.removeSolicitationSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    all: state.all.filter((s) => s._id !== id),
    selected: state.selected?._id === id ? undefined : state.selected,
  })),
  on(SolicitationActions.removeSolicitationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to remove solicitation', // Store error message or the object
  }))
);
