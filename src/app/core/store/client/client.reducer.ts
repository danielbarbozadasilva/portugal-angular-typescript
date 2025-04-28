import { createReducer, on } from '@ngrx/store';
import { Client, signUpClient, signUpClientSuccess, signUpClientFailure } from './client.actions';

export const clientFeatureKey = 'client';

// Estado da feature de cliente (cadastro)
export interface ClientState {
  client: Client | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial
export const initialState: ClientState = {
  client: null,
  loading: false,
  error: null
};

// Reducer de cliente para tratar as ações de cadastro
export const clientReducer = createReducer(
  initialState,
  on(signUpClient, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(signUpClientSuccess, (state, { client }) => ({
    ...state,
    loading: false,
    client: client,
    error: null
  })),
  on(signUpClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
