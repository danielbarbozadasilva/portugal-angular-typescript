import { createReducer, on } from '@ngrx/store';
import * as ActivityActions from './activity.actions';
import { IActivity, IResponseError } from '../../models/models.index'; // Importar IResponseError

export interface ActivityState {
  loading: boolean;
  activities: IActivity[];
  selectedActivity: IActivity | null; // Adicionar estado para atividade selecionada
  error: IResponseError | string | null;
  totalPages?: number; // Adicionar total de páginas (opcional)
  currentPage?: number; // Adicionar página atual (opcional)
}

const initialState: ActivityState = {
  loading: false,
  activities: [],
  selectedActivity: null, // Inicializar como null
  error: null,
  totalPages: undefined, // Inicializar como indefinido
  currentPage: undefined, // Inicializar como indefinido
};

export const activityReducer = createReducer(
  initialState,

  // Load Activities
  on(ActivityActions.loadActivities, (state) => ({
    ...state,
    loading: true,
    error: null, // Limpar erro ao carregar
  })),
  on(ActivityActions.loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    loading: false,
    activities: activities,
  })),
  on(ActivityActions.loadActivitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // Load Activity By ID
  on(ActivityActions.loadActivityById, (state) => ({
    ...state,
    loading: true,
    selectedActivity: null, // Limpar selecionado ao carregar novo
    error: null,
  })),
  on(ActivityActions.loadActivityByIdSuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    selectedActivity: activity,
  })),
  on(ActivityActions.loadActivityByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // Clear Activity Error
  on(ActivityActions.clearActivityError, (state) => ({
    ...state,
    error: null,
  }))
);
