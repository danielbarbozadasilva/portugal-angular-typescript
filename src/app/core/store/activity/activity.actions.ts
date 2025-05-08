import { createAction, props } from '@ngrx/store';
import { IActivity, IResponseError } from '../../models/models.index'; // Importar IResponseError

// Load Multiple Activities (com filtros opcionais)
export const loadActivities = createAction(
  '[Activity] Load Activities',
  props<{ filters?: any }>() // Manter filtros opcionais
);
export const loadActivitiesSuccess = createAction(
  '[Activity] Load Activities Success',
  props<{ activities: IActivity[] }>() // Usar IActivity[]
);
export const loadActivitiesFailure = createAction(
  '[Activity] Load Activities Failure',
  props<{ error: IResponseError | string }>() // Usar tipo de erro padronizado
);

// Load Single Activity by ID
export const loadActivityById = createAction('[Activity] Load Activity By ID', props<{ id: string }>());
export const loadActivityByIdSuccess = createAction(
  '[Activity] Load Activity By ID Success',
  props<{ activity: IActivity }>() // Usar IActivity
);
export const loadActivityByIdFailure = createAction(
  '[Activity] Load Activity By ID Failure',
  props<{ error: IResponseError | string }>() // Usar tipo de erro padronizado
);

// Clear Activity Error (Opcional, mas recomendado)
export const clearActivityError = createAction('[Activity] Clear Error');
