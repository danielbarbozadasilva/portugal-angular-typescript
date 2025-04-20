import { createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';
import { IClient } from '../../models/models.index';

export interface ClientState {
  loading: boolean;
  all: IClient[];
  selected?: IClient;
  error?: string;
}

const initialState: ClientState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const clientReducer = createReducer(
  initialState,

  on(ClientActions.loadClients, (state) => ({
    ...state,
    loading: true,
    error: undefined
  })),
  on(ClientActions.loadClientsSuccess, (state, { clients }) => ({
    ...state,
    loading: false,
    all: clients
  })),
  on(ClientActions.loadClientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ClientActions.loadClientById, (state) => ({
    ...state,
    loading: true
  })),
  on(ClientActions.loadClientByIdSuccess, (state, { client }) => ({
    ...state,
    loading: false,
    selected: client
  })),
  on(ClientActions.loadClientByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ClientActions.createClient, (state) => ({
    ...state,
    loading: true
  })),
  on(ClientActions.createClientSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ClientActions.createClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ClientActions.updateClient, (state) => ({
    ...state,
    loading: true
  })),
  on(ClientActions.updateClientSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ClientActions.updateClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ClientActions.deleteClient, (state) => ({
    ...state,
    loading: true
  })),
  on(ClientActions.deleteClientSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ClientActions.deleteClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
