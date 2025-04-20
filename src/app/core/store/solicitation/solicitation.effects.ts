import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SolicitationService } from '../../../core/http/solicitation.service';
import * as SolicitationActions from './solicitation.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class SolicitationEffects {
  constructor(
    private actions$: Actions,
    private solicitationService: SolicitationService
  ) {}

  loadAllSolicitations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.loadAllSolicitations),
      mergeMap(() =>
        this.solicitationService.getAllSolicitations().pipe(
          map(solicitations => SolicitationActions.loadAllSolicitationsSuccess({ solicitations })),
          catchError(error => of(SolicitationActions.loadAllSolicitationsFailure({ error })))
        )
      )
    )
  );

  loadSolicitationById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.loadSolicitationById),
      mergeMap(({ id }) =>
        this.solicitationService.getSolicitation(id).pipe(
          map(solicitation => SolicitationActions.loadSolicitationByIdSuccess({ solicitation })),
          catchError(error => of(SolicitationActions.loadSolicitationByIdFailure({ error })))
        )
      )
    )
  );

  updateSolicitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.updateSolicitation),
      mergeMap(({ id, data }) =>
        this.solicitationService.updateSolicitation(id, data).pipe(
          map(() => SolicitationActions.updateSolicitationSuccess()),
          catchError(error => of(SolicitationActions.updateSolicitationFailure({ error })))
        )
      )
    )
  );

  removeSolicitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.removeSolicitation),
      mergeMap(({ id }) =>
        this.solicitationService.deleteSolicitation(id).pipe(
          map(() => SolicitationActions.removeSolicitationSuccess()),
          catchError(error => of(SolicitationActions.removeSolicitationFailure({ error })))
        )
      )
    )
  );
}
