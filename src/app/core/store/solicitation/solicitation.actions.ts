import { createAction, props } from '@ngrx/store';
import { ISolicitation, IResponseError } from '../../models/models.index';

export const loadAllSolicitations = createAction('[Solicitation] Load All Solicitations');
export const loadAllSolicitationsSuccess = createAction(
  '[Solicitation] Load All Solicitations Success',
  props<{ solicitations: ISolicitation[] }>()
);
export const loadAllSolicitationsFailure = createAction(
  '[Solicitation] Load All Solicitations Failure',
  props<{ error: IResponseError }>()
);

export const loadSolicitationById = createAction('[Solicitation] Load Solicitation By ID', props<{ id: string }>());
export const loadSolicitationByIdSuccess = createAction(
  '[Solicitation] Load Solicitation By ID Success',
  props<{ solicitation: ISolicitation }>()
);
export const loadSolicitationByIdFailure = createAction(
  '[Solicitation] Load Solicitation By ID Failure',
  props<{ error: IResponseError }>()
);

export const updateSolicitation = createAction(
  '[Solicitation] Update Solicitation',
  props<{ id: string; data: Partial<ISolicitation> }>()
);
export const updateSolicitationSuccess = createAction(
  '[Solicitation] Update Solicitation Success',
  props<{ solicitation: ISolicitation }>()
);
export const updateSolicitationFailure = createAction(
  '[Solicitation] Update Solicitation Failure',
  props<{ error: IResponseError }>()
);

export const removeSolicitation = createAction('[Solicitation] Remove Solicitation', props<{ id: string }>());
export const removeSolicitationSuccess = createAction(
  '[Solicitation] Remove Solicitation Success',
  props<{ id: string }>()
);
export const removeSolicitationFailure = createAction(
  '[Solicitation] Remove Solicitation Failure',
  props<{ error: IResponseError }>()
);

export const clearSolicitationError = createAction('[Solicitation] Clear Error');
