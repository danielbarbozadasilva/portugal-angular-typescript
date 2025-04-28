import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { signUpClient, signUpClientSuccess, signUpClientFailure } from './client.actions';
import { ClientService } from '../../http/client.service';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class ClientEffects {
  constructor(private actions$: Actions, private clientService: ClientService) {}

  // Effect para tratar o fluxo de cadastro de cliente
  signUpClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpClient),
      mergeMap(action =>
        this.clientService.signUp(action.data as any).pipe(
          map(client => signUpClientSuccess({ client } as any)),
          catchError(error => of(signUpClientFailure({ error: error.message || 'Erro desconhecido' })))
        )
      )
    )
  );
}
