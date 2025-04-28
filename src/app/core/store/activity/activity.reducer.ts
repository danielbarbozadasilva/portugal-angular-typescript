/**
 * @file activity.reducer.ts
 * @description Define como o estado da aplicação é alterado em resposta às ações definidas no ActivityActions.
 */

import { createReducer, on } from '@ngrx/store';
import * as ActivityActions from './activity.actions';
import { IActivity } from '../../models/models.activity';

export interface ActivityState {
  loading: boolean;
  all: IActivity[];
  selected?: IActivity;
  error?: any; // Mudar para any para capturar melhor o erro
}

const initialState: ActivityState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined,
};

export const activityReducer = createReducer(
  initialState,

  // Carregar todas as atividades
  on(ActivityActions.loadActivities, (state) => {
    console.log('[ActivityReducer] Handling loadActivities');
    return {
      ...state,
      loading: true,
      error: undefined,
    };
  }),
  on(ActivityActions.loadActivitiesSuccess, (state, { activities }) => {
    console.log('[ActivityReducer] Handling loadActivitiesSuccess:', activities);
    return {
      ...state,
      loading: false,
      all: activities,
    };
  }),
  on(ActivityActions.loadActivitiesFailure, (state, { error }) => {
    console.error('[ActivityReducer] Handling loadActivitiesFailure:', error);
    return {
      ...state,
      loading: false,
      error: error, // Armazenar o objeto de erro completo
    };
  }),

  // Carregar atividade por ID
  on(ActivityActions.loadActivityById, (state) => ({
    ...state,
    loading: true,
  })),
  on(ActivityActions.loadActivityByIdSuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    selected: activity,
  })),
  on(ActivityActions.loadActivityByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // Criar atividade
  on(ActivityActions.createActivity, (state) => ({
    ...state,
    loading: true,
  })),
  on(ActivityActions.createActivitySuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ActivityActions.createActivityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // Atualizar atividade
  on(ActivityActions.updateActivity, (state) => ({
    ...state,
    loading: true,
  })),
  on(ActivityActions.updateActivitySuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ActivityActions.updateActivityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // Deletar atividade
  on(ActivityActions.deleteActivity, (state) => ({
    ...state,
    loading: true,
  })),
  on(ActivityActions.deleteActivitySuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ActivityActions.deleteActivityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
