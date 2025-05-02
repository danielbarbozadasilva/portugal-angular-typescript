import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { signUpClient, signUpClientSuccess, signUpClientFailure } from './client.actions';
import { ClientService } from '../../http/client.service';
import { mergeMap, map, catchError, of } from 'rxjs';
import { IClient, IClientRequest, IResponseError } from '../../models/models.index';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}

  // Effect para tratar o fluxo de cadastro de cliente
  signUpClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpClient),
      mergeMap((action) =>
        this.clientService.createClient(action.data).pipe(
          map((client: IClient) => signUpClientSuccess({ client })),
          catchError((error: IResponseError | any) => {
            const errorMessage = error?.message || 'Erro desconhecido ao cadastrar cliente.';
            return of(signUpClientFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
