import { createAction, props } from '@ngrx/store';
import { IClient } from '../../models/models.client';
import { IResponseError } from '../../models/models.index';

// Ação para iniciar o processo de cadastro de cliente
export const signUpClient = createAction('[Client] Sign Up Client', props<{ data: IClient }>());

// Ação disparada em caso de sucesso no cadastro
export const signUpClientSuccess = createAction('[Client] Sign Up Client Success', props<{ client: IClient }>());

// Ação disparada em caso de falha no cadastro
export const signUpClientFailure = createAction(
  '[Client] Sign Up Client Failure',
  props<{ error: IResponseError | string }>()
);
