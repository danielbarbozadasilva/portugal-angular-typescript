import { createAction, props } from '@ngrx/store';
import { IClient } from '../../models/models.index';

export const loadClients = createAction(
  '[Client] Load Clients'
);

export const loadClientsSuccess = createAction(
  '[Client] Load Clients Success',
  props<{ clients: IClient[] }>()
);

export const loadClientsFailure = createAction(
  '[Client] Load Clients Failure',
  props<{ error: any }>()
);

export const loadClientById = createAction(
  '[Client] Load Client By ID',
  props<{ id: string }>()
);

export const loadClientByIdSuccess = createAction(
  '[Client] Load Client By ID Success',
  props<{ client: IClient }>()
);

export const loadClientByIdFailure = createAction(
  '[Client] Load Client By ID Failure',
  props<{ error: any }>()
);

export const createClient = createAction(
  '[Client] Create Client',
  props<{ client: Partial<IClient> }>()
);

export const createClientSuccess = createAction(
  '[Client] Create Client Success'
);

export const createClientFailure = createAction(
  '[Client] Create Client Failure',
  props<{ error: any }>()
);

export const updateClient = createAction(
  '[Client] Update Client',
  props<{ id: string; data: Partial<IClient> }>()
);

export const updateClientSuccess = createAction(
  '[Client] Update Client Success'
);

export const updateClientFailure = createAction(
  '[Client] Update Client Failure',
  props<{ error: any }>()
);

export const deleteClient = createAction(
  '[Client] Delete Client',
  props<{ id: string }>()
);

export const deleteClientSuccess = createAction(
  '[Client] Delete Client Success'
);

export const deleteClientFailure = createAction(
  '[Client] Delete Client Failure',
  props<{ error: any }>()
);
