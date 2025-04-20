import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientActions from './client.actions';
import { ClientService } from '../../../core/http/client.service';
import { mergeMap, map, catchError, of } from 'rxjs';

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
          map(clients => ClientActions.loadClientsSuccess({ clients })),
          catchError(error => of(ClientActions.loadClientsFailure({ error })))
        )
      )
    )
  );

  loadClientById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.loadClientById),
      mergeMap(({ id }) =>
        this.clientService.getClient(id).pipe(
          map(client => ClientActions.loadClientByIdSuccess({ client })),
          catchError(error => of(ClientActions.loadClientByIdFailure({ error })))
        )
      )
    )
  );

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createClient),
      mergeMap(({ client }) =>
        this.clientService.createClient(client).pipe(
          map(() => ClientActions.createClientSuccess()),
          catchError(error => of(ClientActions.createClientFailure({ error })))
        )
      )
    )
  );

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClient),
      mergeMap(({ id, data }) =>
        this.clientService.updateClient(id, data).pipe(
          map(() => ClientActions.updateClientSuccess()),
          catchError(error => of(ClientActions.updateClientFailure({ error })))
        )
      )
    )
  );

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.deleteClient),
      mergeMap(({ id }) =>
        this.clientService.deleteClient(id).pipe(
          map(() => ClientActions.deleteClientSuccess()),
          catchError(error => of(ClientActions.deleteClientFailure({ error })))
        )
      )
    )
  );
}
