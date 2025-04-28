import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { SolicitationCartService } from '../../http/solicitationsCartItem.service'; // Correct path
import * as SolicitationCartActions from './solicitation-cart.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class SolicitationCartEffects {
  constructor(
    private actions$: Actions,
    private solicitationCartService: SolicitationCartService
  ) {}

  loadAllItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.loadAllSolicitationCartItems),
      mergeMap(() =>
        this.solicitationCartService.getAllSolicitationCartItems().pipe(
          map((items) => SolicitationCartActions.loadAllSolicitationCartItemsSuccess({ items })),
          catchError((error: IResponseError) =>
            of(SolicitationCartActions.loadAllSolicitationCartItemsFailure({ error }))
          )
        )
      )
    )
  );

  loadItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.loadSolicitationCartItemById),
      switchMap((action) =>
        this.solicitationCartService.getSolicitationCartItemById(action.id).pipe(
          map((item) => SolicitationCartActions.loadSolicitationCartItemByIdSuccess({ item })),
          catchError((error: IResponseError) =>
            of(SolicitationCartActions.loadSolicitationCartItemByIdFailure({ error }))
          )
        )
      )
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.updateSolicitationCartItem),
      mergeMap((action) =>
        this.solicitationCartService.updateSolicitationCartItem(action.id, action.data).pipe(
          // Assuming success action doesn't need the updated item, adjust if needed
          map(() => SolicitationCartActions.updateSolicitationCartItemSuccess()),
          catchError((error: IResponseError) =>
            of(SolicitationCartActions.updateSolicitationCartItemFailure({ error }))
          )
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitationCartActions.removeSolicitationCartItem),
      mergeMap((action) =>
        this.solicitationCartService.removeSolicitationCartItem(action.id).pipe(
          // Assuming success action doesn't need the id, adjust if needed
          map(() => SolicitationCartActions.removeSolicitationCartItemSuccess()),
          catchError((error: IResponseError) =>
            of(SolicitationCartActions.removeSolicitationCartItemFailure({ error }))
          )
        )
      )
    )
  );

  // Add create effect if create action/service method exists
  // createItem$ = createEffect(() => ... );
}
