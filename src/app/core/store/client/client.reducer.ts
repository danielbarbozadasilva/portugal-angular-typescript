import { createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';
import { IClient, IResponseError } from '../../models/models.index'; // Importar tipos centrais

export interface ClientState {
  loading: boolean;
  client: IClient | null; // Usar IClient
  error: IResponseError | string | null; // Usar tipo de erro padronizado
}

export const initialState: ClientState = {
  loading: false,
  client: null,
  error: null,
};

export const clientReducer = createReducer(
  initialState,

  // Reducer para iniciar o cadastro
  on(ClientActions.signUpClient, (state) => ({
    ...state,
    loading: true,
    error: null, // Limpa erros anteriores
  })),

  // Reducer para sucesso no cadastro
  on(ClientActions.signUpClientSuccess, (state, { client }) => ({
    ...state,
    loading: false,
    client: client, // Armazena o cliente retornado
    error: null,
  })),

  // Reducer para falha no cadastro
  on(ClientActions.signUpClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    client: null, // Limpa o cliente em caso de erro
    error: error,
  }))
);
