import { createAction, props } from '@ngrx/store';
import { ISolicitation } from '../../models/models.index';

export const loadAllSolicitations = createAction('[Solicitation] Load All');
export const loadAllSolicitationsSuccess = createAction(
  '[Solicitation] Load All Success',
  props<{ solicitations: ISolicitation[] }>()
);
export const loadAllSolicitationsFailure = createAction(
  '[Solicitation] Load All Failure',
  props<{ error: any }>()
);

export const loadSolicitationById = createAction(
  '[Solicitation] Load By ID',
  props<{ id: string }>()
);
export const loadSolicitationByIdSuccess = createAction(
  '[Solicitation] Load By ID Success',
  props<{ solicitation: ISolicitation }>()
);
export const loadSolicitationByIdFailure = createAction(
  '[Solicitation] Load By ID Failure',
  props<{ error: any }>()
);

export const updateSolicitation = createAction(
  '[Solicitation] Update',
  props<{ id: string; data: Partial<ISolicitation> }>()
);
export const updateSolicitationSuccess = createAction('[Solicitation] Update Success');
export const updateSolicitationFailure = createAction(
  '[Solicitation] Update Failure',
  props<{ error: any }>()
);

export const removeSolicitation = createAction(
  '[Solicitation] Remove',
  props<{ id: string }>()
);
export const removeSolicitationSuccess = createAction('[Solicitation] Remove Success');
export const removeSolicitationFailure = createAction(
  '[Solicitation] Remove Failure',
  props<{ error: any }>()
);
