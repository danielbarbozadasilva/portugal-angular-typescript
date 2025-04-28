import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { SolicitationService } from '../../http/solicitation.service'; // Correct path
import * as SolicitationActions from './solicitation.actions';
import { IResponseError } from '../../models/models.index';

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
          map((solicitations) => SolicitationActions.loadAllSolicitationsSuccess({ solicitations })),
          catchError((error: IResponseError) => of(SolicitationActions.loadAllSolicitationsFailure({ error })))
        )
      )
    )
  );

  loadSolicitationById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.loadSolicitationById),
      switchMap((action) =>
        this.solicitationService.getSolicitationById(action.id).pipe(
          map((solicitation) => SolicitationActions.loadSolicitationByIdSuccess({ solicitation })),
          catchError((error: IResponseError) => of(SolicitationActions.loadSolicitationByIdFailure({ error })))
        )
      )
    )
  );

  updateSolicitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.updateSolicitation),
      mergeMap((action) =>
        this.solicitationService.updateSolicitation(action.id, action.data).pipe(
          map((solicitation) => SolicitationActions.updateSolicitationSuccess({ solicitation })),
          catchError((error: IResponseError) => of(SolicitationActions.updateSolicitationFailure({ error })))
        )
      )
    )
  );

  removeSolicitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationActions.removeSolicitation),
      mergeMap((action) =>
        this.solicitationService.removeSolicitation(action.id).pipe(
          map(({ id }) => SolicitationActions.removeSolicitationSuccess({ id })),
          catchError((error: IResponseError) => of(SolicitationActions.removeSolicitationFailure({ error })))
        )
      )
    )
  );
}
