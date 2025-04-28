import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ClientService } from '../../http/client.service'; // Correct path
import * as ClientActions from './client.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.loadClients),
      mergeMap(() =>
        this.clientService.getAllClients().pipe(
          map((clients) => ClientActions.loadClientsSuccess({ clients })),
          catchError((error: IResponseError) => of(ClientActions.loadClientsFailure({ error })))
        )
      )
    )
  );

  loadClientById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.loadClientById),
      switchMap((action) =>
        this.clientService.getClient(action.id).pipe(
          map((client) => ClientActions.loadClientByIdSuccess({ client })),
          catchError((error: IResponseError) => of(ClientActions.loadClientByIdFailure({ error })))
        )
      )
    )
  );

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createClient),
      mergeMap((action) =>
        this.clientService.createClient(action.client).pipe(
          // Assuming success action doesn't need the created client
          map(() => ClientActions.createClientSuccess()),
          // Optionally dispatch loadClients again or navigate
          catchError((error: IResponseError) => of(ClientActions.createClientFailure({ error })))
        )
      )
    )
  );

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClient),
      mergeMap((action) =>
        this.clientService.updateClient(action.id, action.data).pipe(
          // Assuming success action doesn't need the updated client
          map(() => ClientActions.updateClientSuccess()),
          catchError((error: IResponseError) => of(ClientActions.updateClientFailure({ error })))
        )
      )
    )
  );

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.deleteClient),
      mergeMap((action) =>
        this.clientService.deleteClient(action.id).pipe(
          // Assuming success action doesn't need the id
          map(() => ClientActions.deleteClientSuccess()),
          catchError((error: IResponseError) => of(ClientActions.deleteClientFailure({ error })))
        )
      )
    )
  );
}
